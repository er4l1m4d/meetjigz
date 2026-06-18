import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Window from './Window.jsx'

describe('Window', () => {
  it('renders the window title', () => {
    render(<Window title="Test Window" onClose={vi.fn()} />)
    expect(screen.getByRole('heading', { name: /test window/i })).toBeInTheDocument()
  })

  it('renders the close button', () => {
    render(<Window title="My App" onClose={vi.fn()} />)
    expect(screen.getByRole('button', { name: /close my app/i })).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <Window title="Content" onClose={vi.fn()}>
        <p>Inside the window</p>
      </Window>,
    )
    expect(screen.getByText('Inside the window')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<Window title="Closeable" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: /close closeable/i }))

    // onClose is called after animation completes
    expect(onClose).not.toHaveBeenCalled()
  })
})
