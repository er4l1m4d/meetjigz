import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import TopBar from './TopBar.jsx'

describe('TopBar', () => {
  it('renders the brand name', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('link', { name: /jigz/i })).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /works/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the mobile menu control', () => {
    renderWithProviders(<TopBar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })
})
