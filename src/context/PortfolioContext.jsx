import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react'
import {
  FEATURED_ENTRIES, ARCHIVE_ENTRIES, DEFAULT_CONTACT, DEFAULT_HERO,
  DEFAULT_ABOUT, DEFAULT_SKILLS,
} from '../data/defaults.js'

const PortfolioContext = createContext(null)

const STORAGE_KEYS = {
  featured: 'jigz-featured-entries',
  archive: 'jigz-archive-entries',
  hero: 'jigz-hero',
  contact: 'jigz-contact',
  about: 'jigz-about',
  skills: 'jigz-skills',
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
  } catch {}
}

async function fetchPortfolio() {
  try {
    const res = await fetch('/api/portfolio')
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function savePortfolio(data) {
  try {
    await fetch('/api/portfolio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {}
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
  const [about, setAboutState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.about, DEFAULT_ABOUT),
  )
  const [skills, setSkillsState] = useState(() =>
    loadFromStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS),
  )
  const [loaded, setLoaded] = useState(false)

  // On mount: fetch from API and override localStorage cache
  useEffect(() => {
    fetchPortfolio().then((data) => {
      if (data) {
        if (data.featured) {
          setFeaturedState(data.featured)
          saveToStorage(STORAGE_KEYS.featured, data.featured)
        }
        if (data.archive) {
          setArchiveState(data.archive)
          saveToStorage(STORAGE_KEYS.archive, data.archive)
        }
        if (data.hero) {
          setHeroState(data.hero)
          saveToStorage(STORAGE_KEYS.hero, data.hero)
        }
        if (data.contact) {
          setContactState(data.contact)
          saveToStorage(STORAGE_KEYS.contact, data.contact)
        }
        if (data.about) {
          setAboutState(data.about)
          saveToStorage(STORAGE_KEYS.about, data.about)
        }
        if (data.skills) {
          setSkillsState(data.skills)
          saveToStorage(STORAGE_KEYS.skills, data.skills)
        }
      }
      setLoaded(true)
    }).catch(() => setLoaded(true))
  }, [])

  const setFeaturedEntries = useCallback((newEntries) => {
    setFeaturedState((prev) => {
      const next = typeof newEntries === 'function' ? newEntries(prev) : newEntries
      saveToStorage(STORAGE_KEYS.featured, next)
      savePortfolio({ featured: next })
      return next
    })
  }, [])

  const setArchiveEntries = useCallback((newEntries) => {
    setArchiveState((prev) => {
      const next = typeof newEntries === 'function' ? newEntries(prev) : newEntries
      saveToStorage(STORAGE_KEYS.archive, next)
      savePortfolio({ archive: next })
      return next
    })
  }, [])

  const setHero = useCallback((updates) => {
    setHeroState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.hero, next)
      savePortfolio({ hero: next })
      return next
    })
  }, [])

  const setContact = useCallback((updates) => {
    setContactState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.contact, next)
      savePortfolio({ contact: next })
      return next
    })
  }, [])

  const setAbout = useCallback((updates) => {
    setAboutState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.about, next)
      savePortfolio({ about: next })
      return next
    })
  }, [])

  const setSkills = useCallback((updates) => {
    setSkillsState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates }
      saveToStorage(STORAGE_KEYS.skills, next)
      savePortfolio({ skills: next })
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
    about,
    skills,
    loaded,
    setFeaturedEntries,
    setArchiveEntries,
    setHero,
    setContact,
    setAbout,
    setSkills,
    addEntry,
    updateEntry,
    deleteEntry,
  }), [featuredEntries, archiveEntries, hero, contact, about, skills, loaded, setFeaturedEntries, setArchiveEntries, setHero, setContact, setAbout, setSkills, addEntry, updateEntry, deleteEntry])

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
