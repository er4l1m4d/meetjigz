import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import TopBar from './TopBar.jsx'

describe('TopBar', () => {
  it('renders the brand name', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByText('jigz')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('button', { name: /my works/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders hire me button', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('button', { name: /let's build/i })).toBeInTheDocument()
  })
})
