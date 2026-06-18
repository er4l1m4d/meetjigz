import { useState, useCallback } from 'react'
import { DEFAULT_PROJECTS, DEFAULT_ABOUT, DEFAULT_CONTACT } from '../data/defaults.js'

const STORAGE_KEYS = {
  projects: 'jigz-projects',
  about: 'jigz-about',
}

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function usePortfolioData() {
  const [projects, setProjectsState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.projects, DEFAULT_PROJECTS),
  )
  const [about, setAboutState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.about, DEFAULT_ABOUT),
  )

  const setProjects = useCallback((newProjects) => {
    setProjectsState((prev) => {
      const next = typeof newProjects === 'function' ? newProjects(prev) : newProjects
      saveToStorage(STORAGE_KEYS.projects, next)
      return next
    })
  }, [])

  const setAbout = useCallback((newAbout) => {
    setAboutState((prev) => {
      const next = typeof newAbout === 'function' ? newAbout(prev) : newAbout
      saveToStorage(STORAGE_KEYS.about, next)
      return next
    })
  }, [])

  const addProject = useCallback(
    (project) => {
      setProjects((prev) => [...prev, { ...project, id: crypto.randomUUID() }])
    },
    [setProjects],
  )

  const updateProject = useCallback(
    (id, updates) => {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      )
    },
    [setProjects],
  )

  const deleteProject = useCallback(
    (id) => {
      setProjects((prev) => prev.filter((p) => p.id !== id))
    },
    [setProjects],
  )

  return {
    projects,
    about,
    contact: DEFAULT_CONTACT,
    setProjects,
    setAbout,
    addProject,
    updateProject,
    deleteProject,
  }
}
