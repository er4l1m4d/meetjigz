import { describe, it, expect, beforeEach } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import ConsolePage from './ConsolePage.jsx'

describe('ConsolePage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the console title', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('console')).toBeInTheDocument()
  })

  it('renders hero section with default values', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ hero --edit')).toBeInTheDocument()
    expect(screen.getByDisplayValue('portfolio2026')).toBeInTheDocument()
    expect(screen.getByDisplayValue('I design and build digital products')).toBeInTheDocument()
  })

  it('renders entry list with default entries', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ entries --list')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Ciphra')).toBeInTheDocument()
  })

  it('renders contact section with default values', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ contact --edit')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Jigz')).toBeInTheDocument()
    expect(screen.getByDisplayValue('hello@jigz.dev')).toBeInTheDocument()
  })

  it('renders back link to main', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('← back to main')).toHaveAttribute('href', '/')
  })

  it('can open new entry form', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConsolePage />)

    const addBtn = screen.getByText('+ new entry')
    await user.click(addBtn)

    expect(screen.getByText('create')).toBeInTheDocument()
    expect(screen.getByText('cancel')).toBeInTheDocument()
  })

  it('can delete an entry and shows toast', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConsolePage />)

    const deleteBtns = screen.getAllByText('delete')
    await user.click(deleteBtns[0])

    expect(screen.getByText(/deleted/)).toBeInTheDocument()
  })
})
