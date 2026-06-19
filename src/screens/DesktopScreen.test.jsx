import { screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import DesktopScreen from './DesktopScreen.jsx'

describe('DesktopScreen', () => {
  it('renders the page', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the hero headline', async () => {
    renderWithProviders(<DesktopScreen />)
    await waitFor(() => {
      const jigzElements = screen.getAllByText(/jigz/i)
      const headline = jigzElements.find(
        (el) => el.className.includes('headline')
      )
      expect(headline).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('renders projects section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /selected works/i })).toBeInTheDocument()
  })

  it('renders about section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()
  })

  it('renders contact section', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the footer', () => {
    renderWithProviders(<DesktopScreen />)
    expect(screen.getByText(/© 2026 jigz/i)).toBeInTheDocument()
  })
})
