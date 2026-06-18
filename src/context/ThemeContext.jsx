/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_STORAGE_KEY = 'jigz-os-theme'
const THEME_TRANSITION_CLASS = 'theme-transitioning'
const THEME_TRANSITION_TIMEOUT_MS = 320

const ThemeContext = createContext(null)

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.add(THEME_TRANSITION_CLASS)
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)

    const timeoutId = window.setTimeout(() => {
      document.documentElement.classList.remove(THEME_TRANSITION_CLASS)
    }, THEME_TRANSITION_TIMEOUT_MS)

    return () => {
      window.clearTimeout(timeoutId)
      document.documentElement.classList.remove(THEME_TRANSITION_CLASS)
    }
  }, [theme])

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      isLight: theme === 'light',
      setLightTheme,
      setDarkTheme,
      toggleTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
