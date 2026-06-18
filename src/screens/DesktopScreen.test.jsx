import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DesktopScreen from './DesktopScreen.jsx'
import { renderWithProviders } from '../test/renderWithProviders.jsx'

describe('DesktopScreen', () => {
  it('renders the desktop region', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('region', { name: /desktop/i })).toBeInTheDocument()
  })

  it('renders the top bar', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('banner', { name: /desktop top bar/i })).toBeInTheDocument()
  })

  it('renders the dock', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('navigation', { name: /desktop dock/i })).toBeInTheDocument()
  })

  it('renders dock icons with correct labels', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /works/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /telegram/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /discord/i })).toBeInTheDocument()
  })

  it('renders the About window by default', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: 'About Me', level: 2 })).toBeInTheDocument()
  })
})
