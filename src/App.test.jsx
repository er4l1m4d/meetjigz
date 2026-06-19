import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'
import { renderWithProviders } from './test/renderWithProviders.jsx'

describe('App', () => {
  it('renders the boot screen on initial load', () => {
    renderWithProviders(<App />)
    expect(screen.getByRole('region', { name: /loading/i })).toBeInTheDocument()
  })
})
