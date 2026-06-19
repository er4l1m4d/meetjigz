import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import DesktopScreen from './DesktopScreen.jsx'

describe('DesktopScreen', () => {
  it('renders the page', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
  })

  it('renders the hero section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /i build experiences/i })).toBeInTheDocument()
  })

  it('renders projects section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
  })

  it('renders about section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /a bit about me/i })).toBeInTheDocument()
  })

  it('renders contact section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /let's work together/i })).toBeInTheDocument()
  })
})
