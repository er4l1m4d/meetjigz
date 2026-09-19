import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import DesktopScreen from './DesktopScreen.jsx'

describe('DesktopScreen', () => {
  it('renders the navigation', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the hero headline', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /designer/i })).toBeInTheDocument()
  })

  it('renders the about section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /turn ideas into real products/i })).toBeInTheDocument()
  })

  it('renders the contact footer', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByText(/say hello/i)).toBeInTheDocument()
  })

  it('renders the footer', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByText(/© 2026 damilare ogo-oluwade/i)).toBeInTheDocument()
  })

  it('renders entry titles from data', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /ciphra/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /verge/i })).toBeInTheDocument()
  })
})
