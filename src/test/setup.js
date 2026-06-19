import '@testing-library/jest-dom/vitest'

if (typeof window !== 'undefined' && typeof window.IntersectionObserver === 'undefined') {
  window.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
