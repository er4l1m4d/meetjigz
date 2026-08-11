import '@testing-library/jest-dom/vitest'

if (typeof window !== 'undefined') {
  if (typeof window.IntersectionObserver === 'undefined') {
    window.IntersectionObserver = class {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  }

  if (typeof window.localStorage === 'undefined') {
    const store = {}
    window.localStorage = {
      getItem: (key) => store[key] ?? null,
      setItem: (key, value) => { store[key] = String(value) },
      removeItem: (key) => { delete store[key] },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]) },
      get length() { return Object.keys(store).length },
      key: (i) => Object.keys(store)[i] ?? null,
    }
  }
}
