import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { usePortfolioData } from './usePortfolioData.js'
import { DEFAULT_PROJECTS } from '../data/defaults.js'

describe('usePortfolioData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns default projects on first load', () => {
    const { result } = renderHook(() => usePortfolioData())
    expect(result.current.projects).toEqual(DEFAULT_PROJECTS)
  })

  it('adds a project with a generated id', () => {
    const { result } = renderHook(() => usePortfolioData())

    act(() => {
      result.current.addProject({
        title: 'New Project',
        description: 'A test project',
        tags: ['Dev'],
      })
    })

    expect(result.current.projects).toHaveLength(DEFAULT_PROJECTS.length + 1)
    const added = result.current.projects[result.current.projects.length - 1]
    expect(added.title).toBe('New Project')
    expect(added.id).toBeDefined()
  })

  it('updates a project by id', () => {
    const { result } = renderHook(() => usePortfolioData())
    const firstId = DEFAULT_PROJECTS[0].id

    act(() => {
      result.current.updateProject(firstId, { title: 'Updated Title' })
    })

    const updated = result.current.projects.find((p) => p.id === firstId)
    expect(updated.title).toBe('Updated Title')
  })

  it('deletes a project by id', () => {
    const { result } = renderHook(() => usePortfolioData())
    const firstId = DEFAULT_PROJECTS[0].id

    act(() => {
      result.current.deleteProject(firstId)
    })

    expect(result.current.projects.find((p) => p.id === firstId)).toBeUndefined()
  })

  it('persists projects to localStorage', () => {
    const { result } = renderHook(() => usePortfolioData())

    act(() => {
      result.current.addProject({
        title: 'Persisted',
        description: 'Should be saved',
        tags: [],
      })
    })

    const stored = JSON.parse(localStorage.getItem('jigz-projects'))
    expect(stored).toHaveLength(DEFAULT_PROJECTS.length + 1)
  })

  it('returns default contact info', () => {
    const { result } = renderHook(() => usePortfolioData())
    expect(result.current.contact.name).toBe('Jigz')
    expect(result.current.contact.socials).toHaveLength(3)
  })
})
