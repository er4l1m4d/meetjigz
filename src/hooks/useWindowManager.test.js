import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useWindowManager } from './useWindowManager.js'

describe('useWindowManager', () => {
  it('starts with no windows open by default', () => {
    const { result } = renderHook(() => useWindowManager())
    expect(result.current.getWindow('works').open).toBe(false)
    expect(result.current.getWindow('about').open).toBe(false)
  })

  it('opens a window', () => {
    const { result } = renderHook(() => useWindowManager())

    act(() => {
      result.current.openWindow('works')
    })

    expect(result.current.getWindow('works').open).toBe(true)
  })

  it('closes a window', () => {
    const { result } = renderHook(() => useWindowManager(['works']))

    act(() => {
      result.current.closeWindow('works')
    })

    expect(result.current.getWindow('works').open).toBe(false)
  })

  it('focuses a window (increments z-index)', () => {
    const { result } = renderHook(() => useWindowManager(['works']))

    const initialZ = result.current.getWindow('works').zIndex

    act(() => {
      result.current.focusWindow('works')
    })

    expect(result.current.getWindow('works').zIndex).toBeGreaterThan(initialZ)
  })

  it('opens with initial windows', () => {
    const { result } = renderHook(() => useWindowManager(['about', 'contact']))

    expect(result.current.getWindow('about').open).toBe(true)
    expect(result.current.getWindow('contact').open).toBe(true)
    expect(result.current.getWindow('works').open).toBe(false)
  })

  it('gives each window a higher z-index than the previous', () => {
    const { result } = renderHook(() => useWindowManager())

    act(() => {
      result.current.openWindow('works')
    })
    const worksZ = result.current.getWindow('works').zIndex

    act(() => {
      result.current.openWindow('about')
    })
    const aboutZ = result.current.getWindow('about').zIndex

    expect(aboutZ).toBeGreaterThan(worksZ)
  })
})
