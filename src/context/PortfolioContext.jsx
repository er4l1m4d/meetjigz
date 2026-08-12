import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { FEATURED_ENTRIES, ARCHIVE_ENTRIES, DEFAULT_CONTACT, DEFAULT_HERO } from '../data/defaults.js'

const PortfolioContext = createContext(null)

const STORAGE_KEYS = {
  featured: 'jigz-featured-entries',
  archive: 'jigz-archive-entries',
  hero: 'jigz-hero',
  contact: 'jigz-contact',
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
    // Storage full or unavailable
  }
}

function PortfolioProvider({ children }) {
  const [featuredEntries, setFeaturedState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.featured, FEATURED_ENTRIES),
  )
  const [archiveEntries, setArchiveState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.archive, ARCHIVE_ENTRIES),
  )
  const [hero, setHeroState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.hero, DEFAULT_HERO),
  )
  const [contact, setContactState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.contact, DEFAULT_CONTACT),
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

  const setHero = useCallback((updates) => {
    setHeroState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.hero, next)
      return next
    })
  }, [])

  const setContact = useCallback((updates) => {
    setContactState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.contact, next)
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

  const value = useMemo(() => ({
    featuredEntries,
    archiveEntries,
    hero,
    contact,
    setFeaturedEntries,
    setArchiveEntries,
    setHero,
    setContact,
    addEntry,
    updateEntry,
    deleteEntry,
  }), [featuredEntries, archiveEntries, hero, contact, setFeaturedEntries, setArchiveEntries, setHero, setContact, addEntry, updateEntry, deleteEntry])

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

function usePortfolioData() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolioData must be used within a PortfolioProvider')
  return context
}

export { PortfolioProvider, usePortfolioData }
