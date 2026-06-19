import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import BootScreen from './BootScreen.jsx'

describe('BootScreen', () => {
  it('renders the loading region', () => {
    renderWithProviders(<BootScreen />)
    expect(screen.getByRole('region', { name: /loading/i })).toBeInTheDocument()
  })

  it('renders the logo text', () => {
    renderWithProviders(<BootScreen />)
    expect(screen.getByText('Jigz')).toBeInTheDocument()
  })

  it('renders the progress bar', () => {
    renderWithProviders(<BootScreen />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
