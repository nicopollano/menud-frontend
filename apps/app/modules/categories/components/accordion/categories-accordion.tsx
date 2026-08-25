'use client'
import { CategoryActionsDropdown } from '@/modules/categories/components/dropdown/category-actions-dropdown'
import { useMenu } from '@/modules/menus/hooks/use-menu'
import { ProductCard } from '@/modules/products/components/card/product-card'
import { AccordionOptionsSkeleton } from '@/modules/shared/components/skeleton/accordion-options-skeleton'
import { pluralize } from '@/modules/shared/helpers/text.helper'
import { useNavigationParams } from '@/modules/shared/hooks/use-navigation-params'
import { SubcategoriesAccordion } from '@/modules/subcategories/components/accordion/subcategories-accordion'
import type { Category } from '@ristokit/shared/models/category.model'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ristokit/ui/components/accordion'
import { CategoryIcon } from '@ristokit/ui/icons/category.icon'
import { cn } from '@ristokit/ui/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

interface TreePath {
  id: string
  d: string
}

interface CategoryItemProps {
  category: Category
  index: number
}

function CategoryItem({ category, index }: CategoryItemProps) {
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
    let minCurveY = Infinity // Track where first curve starts
    const newPaths: TreePath[] = []

    // Calculate paths for each item
    itemRefs.current.forEach((element, id) => {
      if (!element) return
      const itemRect = element.getBoundingClientRect()
      
      // For subcategories, point to the TOP (icon area), for products point to center
      const isSubcategory = id.startsWith('subcategory-')
      const iconHeight = isSubcategory ? 44 : 0 // size-11 for subcategory icons
      
      // Y position: subcategories -> icon center at top, products -> vertical center
      const targetY = isSubcategory 
        ? itemRect.top - containerRect.top + iconHeight / 2 + 4 // Icon center + small offset
        : itemRect.top - containerRect.top + itemRect.height / 2 // Card center
      
      // X position at the left edge of the item
      const itemX = itemRect.left - containerRect.left

      // Create curved path from vertical line to item
      const curveRadius = 18
      
      // Start point: on the vertical line
      const startX = lineX
      const curveStartY = targetY - curveRadius
      
      // Track max Y for vertical line end
      if (targetY > maxY) maxY = targetY
      
      // End point: at the item
      const endX = itemX
      const endY = targetY
      
      // Curved path that INCLUDES a vertical segment overlapping with main line
      const overlapStart = Math.max(lineStartY, curveStartY - 20)
      const curvedPath = `M ${startX} ${overlapStart} L ${startX} ${curveStartY} C ${startX} ${endY}, ${startX} ${endY}, ${startX + curveRadius} ${endY} L ${endX} ${endY}`

      newPaths.push({ id, d: curvedPath })
    })

    setPaths(newPaths)
    setVerticalLine({
      x: lineX,
      // Vertical line from icon to last item
      y1: lineStartY,
      y2: maxY,
      visible: newPaths.length > 0
    })
  }, [])

  // Recalculate on accordion state change and after content renders
  useEffect(() => {
    // Small delay to allow accordion animation to complete
    const timeoutId = setTimeout(calculatePaths, 50)
    
    // Observe for resize
    const resizeObserver = new ResizeObserver(() => {
      calculatePaths()
    })
    
    // Observe for nested accordion state changes (data-state attribute)
    const mutationObserver = new MutationObserver((mutations) => {
      const hasStateChange = mutations.some(m => 
        m.type === 'attributes' && m.attributeName === 'data-state'
      )
      if (hasStateChange) {
        // Delay to allow animation to progress
        setTimeout(calculatePaths, 100)
      }
    })
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
      mutationObserver.observe(containerRef.current, {
        attributes: true,
        attributeFilter: ['data-state'],
        subtree: true
      })
    }

    return () => {
      clearTimeout(timeoutId)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [calculatePaths, category.products, category.subcategories])

  const setItemRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      itemRefs.current.set(id, el)
    } else {
      itemRefs.current.delete(id)
    }
  }, [])

  return (
    <AccordionItem
      value={category.id}
      className='group/item relative border-none animate-fade-in'
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {/* Contenedor principal con hilo visual */}
      <div ref={containerRef} className='relative flex gap-4'>
        {/* SVG overlay para las líneas del árbol - se oculta cuando está colapsado */}
        <svg 
          className='absolute inset-0 pointer-events-none z-0 overflow-visible transition-opacity duration-300 group-data-[state=closed]/item:opacity-0 group-data-[state=open]/item:opacity-100'
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
        <div className='relative flex flex-col items-center pt-1'>
          {/* Icono de categoría en círculo con gradiente */}
          <div
            ref={iconRef}
            className='relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full shadow-lg transition-all duration-300 group-data-[state=open]/item:shadow-xl'
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #fa5252 100%)',
              boxShadow: '0 8px 16px -4px rgba(250, 82, 82, 0.4)'
            }}
          >
            <CategoryIcon className='size-6 text-white' />
          </div>
        </div>

        {/* Contenido de la categoría */}
        <div className='flex-1'>
          {/* Header */}
          <div
            className='flex items-center justify-between px-6 py-5 transition-all duration-300'
            style={{
              background: '#ffffff',
              boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(250, 82, 82, 0.1)',
              borderRadius: '28px'
            }}
          >
            <AccordionTrigger className='group flex flex-1 items-center justify-start gap-x-4 py-0 hover:no-underline [&[data-state=open]>svg]:rotate-180'>
              <div className='flex flex-col gap-1 flex-1'>
                <h3 className='text-xl font-bold text-neutral-900 tracking-tight'>
                  {category.name}
                </h3>
                <div className='flex items-center gap-3 text-sm text-neutral-500'>
                  <span className='flex items-center gap-1.5'>
                    <span className='size-1.5 rounded-full' style={{ backgroundColor: '#fa5252' }} />
                    {category.summary?.totalProducts || 0} {pluralize({
                      count: category.summary?.totalProducts || 0,
                      singular: 'producto',
                      plural: 'productos'
                    })}
                  </span>
                  {(category.summary?.totalSubcategories || 0) > 0 && (
                    <span className='flex items-center gap-1.5'>
                      <span className='size-1.5 rounded-full bg-neutral-300' />
                      {category.summary?.totalSubcategories || 0} {pluralize({
                        count: category.summary?.totalSubcategories || 0,
                        singular: 'subcategoría',
                        plural: 'subcategorías'
                      })}
                    </span>
                  )}
                </div>
              </div>
              <svg
                className='size-5 shrink-0 transition-transform duration-300 text-neutral-400'
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
            <CategoryActionsDropdown category={category} />
          </div>

          {/* Contenido expandible */}
          <AccordionContent className='px-0 pb-0 pt-0'>
            <div className='relative pt-6'>
              {/* Productos directos de la categoría */}
              {category.products && category.products.length > 0 && (
                <div className='flex flex-col gap-3'>
                  {category.products.map((product) => (
                    <div 
                      key={product.id} 
                      ref={setItemRef(`product-${product.id}`)}
                      className='relative z-10'
                    >
                      <ProductCard product={product} variant='category' />
                    </div>
                  ))}
                </div>
              )}

              {/* Subcategorías */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className={cn(category.products && category.products.length > 0 && 'mt-6')}>
                  {category.subcategories.map((subcategory) => (
                    <div 
                      key={subcategory.id} 
                      ref={setItemRef(`subcategory-${subcategory.id}`)}
                      className='relative mb-6 last:mb-0 z-10'
                    >
                      <SubcategoriesAccordion subcategories={[subcategory]} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </div>
      </div>
    </AccordionItem>
  )
}

function CategoriesAccordion() {
  const { businessId, branchId, menuId } = useNavigationParams()

  const { data, isLoading } = useMenu({
    businessId,
    branchId,
    menuId
  })

  if (isLoading) return <AccordionOptionsSkeleton />

  return (
    <Accordion type='single' collapsible className='flex flex-col gap-y-8'>
      {data?.categories?.map((category, index) => (
        <CategoryItem key={category.id} category={category} index={index} />
      ))}
    </Accordion>
  )
}

export { CategoriesAccordion }
