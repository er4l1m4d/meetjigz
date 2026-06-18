import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import SpotlightOverlay from './SpotlightOverlay.jsx'

describe('SpotlightOverlay', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<SpotlightOverlay isOpen={false} onClose={vi.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the search dialog when open', () => {
    render(<SpotlightOverlay isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('dialog', { name: /spotlight search/i })).toBeInTheDocument()
  })

  it('renders the search input', () => {
    render(<SpotlightOverlay isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('shows sample results by default', () => {
    render(<SpotlightOverlay isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByText('Works')).toBeInTheDocument()
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('filters results based on query', async () => {
    const user = userEvent.setup()
    render(<SpotlightOverlay isOpen={true} onClose={vi.fn()} />)

    await user.type(screen.getByPlaceholderText(/search/i), 'work')

    expect(screen.getByText('Works')).toBeInTheDocument()
    expect(screen.queryByText('About Me')).not.toBeInTheDocument()
    expect(screen.queryByText('Contact')).not.toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<SpotlightOverlay isOpen={true} onClose={onClose} />)
    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<SpotlightOverlay isOpen={true} onClose={onClose} />)
    await user.click(screen.getByRole('dialog'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
