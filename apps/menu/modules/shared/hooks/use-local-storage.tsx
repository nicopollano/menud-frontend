'use client'
import { useState } from 'react'

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue

      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error al obtener valor de local storage con key:', key, error)
      return initialValue
    }
  })

  const saveToLocalStorage = (value: T) => {
    try {
      if (typeof window === 'undefined') return

      window.localStorage.setItem(key, JSON.stringify(value))
      setStoredValue(value)
    } catch (error) {
      console.error('Error al guardar valor de local storage con key:', key, error)
    }
  }

  return [storedValue, saveToLocalStorage] as const
}

export { useLocalStorage }
