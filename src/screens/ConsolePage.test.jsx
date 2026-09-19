import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
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
    expect(screen.getByDisplayValue('Oluwadamilare')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Ogo-Oluwade')).toBeInTheDocument()
  })

  it('renders about section with extended fields', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ about --edit')).toBeInTheDocument()
    expect(screen.getByDisplayValue('I\'m a versatile designer who partners with founders to turn ideas into real products. I focus on clear interfaces, sharp decisions, and fast execution.')).toBeInTheDocument()
  })

  it('renders skills section with heading and subtext', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ skills --edit')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Design meets development.')).toBeInTheDocument()
  })

  it('renders settings section', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ settings --edit')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2026')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Damilare Ogo-Oluwade')).toBeInTheDocument()
  })

  it('renders entry list with default entries', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('$ entries --list')).toBeInTheDocument()
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

  it('renders move up/down buttons for entries', () => {
    renderWithProviders(<ConsolePage />)
    const moveBtns = screen.getAllByTitle('move up')
    expect(moveBtns.length).toBeGreaterThan(0)
  })

  it('can open new entry form with images editor for design kind', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ConsolePage />)

    const addBtn = screen.getByText('+ new entry')
    await user.click(addBtn)

    const comboboxes = screen.getAllByRole('combobox')
    await user.selectOptions(comboboxes[0], 'design')

    expect(screen.getByText('+ add image')).toBeInTheDocument()
  })

  it('renders settings section with nav links editor', () => {
    renderWithProviders(<ConsolePage />)
    expect(screen.getByText('nav links')).toBeInTheDocument()
    expect(screen.getByText('copyright')).toBeInTheDocument()
    expect(screen.getByText('works section')).toBeInTheDocument()
    expect(screen.getByText('contact form')).toBeInTheDocument()
    expect(screen.getByText('interest tags')).toBeInTheDocument()
  })
})
