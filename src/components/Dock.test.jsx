import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Dock from './Dock.jsx'

describe('Dock', () => {
  it('renders all 5 dock items', () => {
    render(<Dock />)
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /works/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /telegram/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /discord/i })).toBeInTheDocument()
  })

  it('calls onOpenWorks when works icon is clicked', async () => {
    const onOpenWorks = vi.fn()
    const user = userEvent.setup()

    render(<Dock onOpenWorks={onOpenWorks} />)
    await user.click(screen.getByRole('button', { name: /works/i }))

    expect(onOpenWorks).toHaveBeenCalledTimes(1)
  })

  it('calls onOpenContact when profile icon is clicked', async () => {
    const onOpenContact = vi.fn()
    const user = userEvent.setup()

    render(<Dock onOpenContact={onOpenContact} />)
    await user.click(screen.getByRole('button', { name: /profile/i }))

    expect(onOpenContact).toHaveBeenCalledTimes(1)
  })

  it('opens external links in new tab for social icons', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open')

    render(<Dock />)
    await user.click(screen.getByRole('button', { name: /x/i }))

    expect(openSpy).toHaveBeenCalledWith('https://x.com/jigz_crypto', '_blank', 'noopener,noreferrer')
    openSpy.mockRestore()
  })
})
