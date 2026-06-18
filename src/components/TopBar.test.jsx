import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TopBar from './TopBar.jsx'
import { renderWithProviders } from '../test/renderWithProviders.jsx'

describe('TopBar', () => {
  it('renders the three decorative dots', () => {
    renderWithProviders(<TopBar />)
    const banner = screen.getByRole('banner')
    const dots = banner.querySelectorAll('[class*="dot"]')
    expect(dots.length).toBe(3)
  })

  it('renders the search button', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('button', { name: /open search/i })).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('calls onOpenSpotlight when search button is clicked', async () => {
    const onOpenSpotlight = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<TopBar onOpenSpotlight={onOpenSpotlight} />)
    await user.click(screen.getByRole('button', { name: /open search/i }))

    expect(onOpenSpotlight).toHaveBeenCalledTimes(1)
  })

  it('displays the current time', () => {
    renderWithProviders(<TopBar />)
    const timeEl = screen.getByText(/\d{2}:\d{2}/)
    expect(timeEl).toBeInTheDocument()
  })
})
