'use client'
import { useState } from 'react'

function useToggle() {
  const [isOn, setIsOn] = useState(false)

  const on = () => setIsOn(true)
  const off = () => setIsOn(false)
  const toggle = () => setIsOn((state) => !state)
  const update = (state: boolean) => setIsOn(state)

  return { isOn, on, off, toggle, update }
}

export { useToggle }
