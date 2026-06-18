import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import BootScreen from './BootScreen.jsx'

describe('BootScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the boot sequence region', () => {
    render(<BootScreen />)
    expect(screen.getByRole('region', { name: /boot sequence/i })).toBeInTheDocument()
  })

  it('renders the progress bar', () => {
    render(<BootScreen />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows boot lines as time advances', () => {
    render(<BootScreen />)

    act(() => {
      vi.advanceTimersByTime(1200)
    })

    expect(screen.getByText('Initializing Jigz OS...')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1100)
    })

    expect(screen.getByText('Loading system files... OK')).toBeInTheDocument()
  })

  it('calls onComplete after the boot sequence finishes', () => {
    const onComplete = vi.fn()
    render(<BootScreen onComplete={onComplete} />)

    act(() => {
      vi.advanceTimersByTime(6800)
    })

    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('applies is-exiting class when isExiting is true', () => {
    const { rerender } = render(<BootScreen isExiting={false} />)
    const section = screen.getByRole('region', { name: /boot sequence/i })
    expect(section.className).not.toContain('isExiting')

    rerender(<BootScreen isExiting={true} />)
    expect(section.className).toContain('isExiting')
  })
})
