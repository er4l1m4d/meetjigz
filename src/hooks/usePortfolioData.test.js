import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { usePortfolioData } from './usePortfolioData.js'
import { FEATURED_ENTRIES } from '../data/defaults.js'

describe('usePortfolioData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default featured entries on first load', () => {
    const { result } = renderHook(() => usePortfolioData())
    expect(result.current.featuredEntries).toEqual(FEATURED_ENTRIES)
  })

  it('adds an entry with a generated id', () => {
    const { result } = renderHook(() => usePortfolioData())

    act(() => {
      result.current.addEntry({
        kind: 'build',
        title: 'New Project',
        description: 'A test project',
        tags: ['Dev'],
      })
    })

    expect(result.current.featuredEntries).toHaveLength(FEATURED_ENTRIES.length + 1)
    const added = result.current.featuredEntries[result.current.featuredEntries.length - 1]
    expect(added.title).toBe('New Project')
    expect(added.id).toBeDefined()
  })

  it('updates an entry by id', () => {
    const { result } = renderHook(() => usePortfolioData())
    const firstId = FEATURED_ENTRIES[0].id

    act(() => {
      result.current.updateEntry(firstId, { title: 'Updated Title' })
    })

    const updated = result.current.featuredEntries.find((e) => e.id === firstId)
    expect(updated.title).toBe('Updated Title')
  })

  it('deletes an entry by id', () => {
    const { result } = renderHook(() => usePortfolioData())
    const firstId = FEATURED_ENTRIES[0].id

    act(() => {
      result.current.deleteEntry(firstId)
    })

    expect(result.current.featuredEntries.find((e) => e.id === firstId)).toBeUndefined()
  })

  it('persists featured entries to localStorage', () => {
    const { result } = renderHook(() => usePortfolioData())

    act(() => {
      result.current.addEntry({
        kind: 'build',
        title: 'Persisted',
        description: 'Should be saved',
        tags: [],
      })
    })

    const stored = JSON.parse(localStorage.getItem('jigz-featured-entries'))
    expect(stored).toHaveLength(FEATURED_ENTRIES.length + 1)
  })

  it('returns default contact info', () => {
    const { result } = renderHook(() => usePortfolioData())
    expect(result.current.contact.name).toBe('Jigz')
    expect(result.current.contact.socials).toHaveLength(3)
  })
})
