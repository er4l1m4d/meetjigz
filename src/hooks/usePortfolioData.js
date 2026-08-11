import { useState, useCallback } from 'react'
import { FEATURED_ENTRIES, ARCHIVE_ENTRIES, DEFAULT_CONTACT } from '../data/defaults.js'

const STORAGE_KEYS = {
  featured: 'jigz-featured-entries',
  archive: 'jigz-archive-entries',
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
  const [featuredEntries, setFeaturedState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.featured, FEATURED_ENTRIES),
  )
  const [archiveEntries, setArchiveState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.archive, ARCHIVE_ENTRIES),
  )

  const setFeaturedEntries = useCallback((newEntries) => {
    setFeaturedState((prev) => {
      const next = typeof newEntries === 'function' ? newEntries(prev) : newEntries
      saveToStorage(STORAGE_KEYS.featured, next)
      return next
    })
  }, [])

  const setArchiveEntries = useCallback((newEntries) => {
    setArchiveState((prev) => {
      const next = typeof newEntries === 'function' ? newEntries(prev) : newEntries
      saveToStorage(STORAGE_KEYS.archive, next)
      return next
    })
  }, [])

  const addEntry = useCallback(
    (entry, target = 'featured') => {
      const newEntry = { ...entry, id: entry.id || crypto.randomUUID() }
      if (target === 'featured') {
        setFeaturedEntries((prev) => [...prev, newEntry])
      } else {
        setArchiveEntries((prev) => [...prev, newEntry])
      }
    },
    [setFeaturedEntries, setArchiveEntries],
  )

  const updateEntry = useCallback(
    (id, updates) => {
      setFeaturedEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      )
      setArchiveEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e)),
      )
    },
    [setFeaturedEntries, setArchiveEntries],
  )

  const deleteEntry = useCallback(
    (id) => {
      setFeaturedEntries((prev) => prev.filter((e) => e.id !== id))
      setArchiveEntries((prev) => prev.filter((e) => e.id !== id))
    },
    [setFeaturedEntries, setArchiveEntries],
  )

  return {
    featuredEntries,
    archiveEntries,
    contact: DEFAULT_CONTACT,
    setFeaturedEntries,
    setArchiveEntries,
    addEntry,
    updateEntry,
    deleteEntry,
  }
}
