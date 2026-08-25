'use client'
import { ProductCard } from '@/modules/products/components/card/product-card'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { SubcategoryActionsDropdown } from '@/modules/subcategories/components/dropdown/subcategory-actions-dropdown'
import type { Subcategory } from '@ristokit/shared/models/subcategory.model'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ristokit/ui/components/accordion'
import { SubcategoryIcon } from '@ristokit/ui/icons/subcategory.icon'
import { useCallback, useEffect, useRef, useState } from 'react'

interface SubcategoriesAccordionProps {
  subcategories: Subcategory[]
}

interface TreePath {
  id: string
  d: string
}

interface SubcategoryItemProps {
  subcategory: Subcategory
  index: number
}

function SubcategoryItem({ subcategory, index }: SubcategoryItemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [paths, setPaths] = useState<TreePath[]>([])
  const [verticalLine, setVerticalLine] = useState({ x: 0, y1: 0, y2: 0, visible: false })

  const calculatePaths = useCallback(() => {
    if (!containerRef.current || !iconRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const iconRect = iconRef.current.getBoundingClientRect()

    // Position of vertical line (center of icon, below it)
    const lineX = iconRect.left - containerRect.left + iconRect.width / 2
    const lineStartY = iconRect.bottom - containerRect.top + 4 // Start just below icon

    let maxY = lineStartY
    let minCurveY = Infinity
    const newPaths: TreePath[] = []

    // Calculate paths for each item
    itemRefs.current.forEach((element, id) => {
      if (!element) return
      const itemRect = element.getBoundingClientRect()
      
      // Y position at the vertical center of the item
      const itemCenterY = itemRect.top - containerRect.top + itemRect.height / 2
      // X position at the left edge of the item
      const itemX = itemRect.left - containerRect.left

      // Create curved path from vertical line to item
      const curveRadius = 15
      
      // Start point: on the vertical line
      const startX = lineX
      const curveStartY = itemCenterY - curveRadius
      
      // Track max Y for vertical line end
      if (itemCenterY > maxY) maxY = itemCenterY
      
      // End point: at the item
      const endX = itemX
      const endY = itemCenterY
      
      // Curved path that INCLUDES a vertical segment overlapping with main line
      // This prevents gaps during animation by having redundant overlap
      const overlapStart = Math.max(lineStartY, curveStartY - 15)
      const curvedPath = `M ${startX} ${overlapStart} L ${startX} ${curveStartY} C ${startX} ${endY}, ${startX} ${endY}, ${startX + curveRadius} ${endY} L ${endX} ${endY}`

      newPaths.push({ id, d: curvedPath })
    })

    setPaths(newPaths)
    setVerticalLine({
      x: lineX,
      y1: lineStartY,
      y2: maxY,
      visible: newPaths.length > 0
    })
  }, [])

  // Recalculate on accordion state change and after content renders
  useEffect(() => {
    // Small delay to allow accordion animation to complete
    const timeoutId = setTimeout(calculatePaths, 50)
    
    // Also observe for resize
    const resizeObserver = new ResizeObserver(() => {
      calculatePaths()
    })
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
    }
  }, [calculatePaths, subcategory.products])

  const setItemRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el)
    } else {
      itemRefs.current.delete(id)
    }
  }, [])

  return (
    <AccordionItem
      value={subcategory.id}
      className='group/subcategory relative border-none animate-fade-in'
      style={{
        animationDelay: `${index * 30}ms`
      }}
    >
      {/* Contenedor principal con hilo visual */}
      <div ref={containerRef} className='relative flex gap-3'>
        {/* SVG overlay para las líneas del árbol - se oculta cuando está colapsado */}
        <svg 
          className='absolute inset-0 pointer-events-none z-0 overflow-visible transition-opacity duration-300 group-data-[state=closed]/subcategory:opacity-0 group-data-[state=open]/subcategory:opacity-100'
          style={{ width: '100%', height: '100%' }}
        >
          {/* Línea vertical principal */}
          {verticalLine.visible && (
            <line
              x1={verticalLine.x}
              y1={verticalLine.y1}
              x2={verticalLine.x}
              y2={verticalLine.y2}
              stroke='#fab1b1'
              strokeWidth='3'
              strokeLinecap='round'
              className='transition-all duration-300'
            />
          )}
          {/* Curvas hacia cada item */}
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke='#fab1b1'
              strokeWidth='3'
              fill='none'
              strokeLinecap='round'
              className='transition-all duration-300'
            />
          ))}
        </svg>

        {/* Columna del icono */}
        <div className='relative flex flex-col items-center pt-0.5 min-h-full'>
          {/* Icono de subcategoría en círculo con gradiente */}
          <div
            ref={iconRef}
            className='relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full shadow-md transition-all duration-300 group-data-[state=open]/subcategory:shadow-lg'
            style={{
              background: 'linear-gradient(135deg, #ffa07a 0%, #ff6b6b 100%)',
              boxShadow: '0 6px 12px -3px rgba(255, 107, 107, 0.4)'
            }}
          >
            <SubcategoryIcon className='size-5 text-white' />
          </div>
        </div>

        {/* Contenido de la subcategoría */}
        <div className='flex-1'>
          {/* Header */}
          <div
            className='flex items-center justify-between px-5 py-4 transition-all duration-300'
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fef5f5 100%)',
              boxShadow: '0 3px 10px -2px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 107, 107, 0.15)',
              borderRadius: '24px'
            }}
          >
            <AccordionTrigger className='group/trigger flex flex-1 items-center justify-start gap-x-3 py-0 hover:no-underline [&[data-state=open]>svg]:rotate-180'>
              <div className='flex flex-col gap-0.5 flex-1'>
                <h4 className='text-base font-bold text-neutral-900'>
                  {subcategory.name}
                </h4>
                <span className='flex items-center gap-1.5 text-xs text-neutral-500'>
                  <span className='size-1 rounded-full' style={{ backgroundColor: '#ff6b6b' }} />
                  {subcategory.products?.length || 0} {pluralize({
                    count: subcategory.products?.length || 0,
                    singular: 'producto',
                    plural: 'productos'
                  })}
                </span>
              </div>
              <svg
                className='size-4 shrink-0 transition-transform duration-300 text-neutral-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M6 9l6 6 6-6' />
              </svg>
            </AccordionTrigger>
            <SubcategoryActionsDropdown subcategory={subcategory} />
          </div>

          {/* Contenido expandible */}
          <AccordionContent className='px-0 pb-0 pt-0'>
            <div className='relative pt-4'>
              <div className='flex flex-col gap-2.5'>
                {subcategory.products &&
                  subcategory.products?.length > 0 &&
                  subcategory.products?.map((product) => (
                    <div 
                      key={product.id} 
                      ref={setItemRef(`product-${product.id}`)}
                      className='relative z-10'
                    >
                      <ProductCard product={product} variant='subcategory' />
                    </div>
                  ))}
              </div>
            </div>
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  )
}

function SubcategoriesAccordion({ subcategories }: SubcategoriesAccordionProps) {
  return (
    <Accordion type='single' collapsible className='flex flex-col gap-y-6'>
      {subcategories.map((subcategory, index) => (
        <SubcategoryItem key={subcategory.id} subcategory={subcategory} index={index} />
      ))}
    </Accordion>
  )
}

export { SubcategoriesAccordion }
