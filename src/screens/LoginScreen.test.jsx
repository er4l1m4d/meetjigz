import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from '../test/renderWithProviders.jsx'

vi.stubEnv('VITE_JIGZ_PASSWORD_HASH', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8')

const { default: LoginScreen } = await import('./LoginScreen.jsx')

describe('LoginScreen', () => {
  it('renders both profile cards', () => {
    renderWithProviders(<LoginScreen />)
    expect(screen.getByRole('button', { name: /jigz/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /guest/i })).toBeInTheDocument()
  })

  it('calls onGuestLogin when guest card is clicked', async () => {
    const onGuestLogin = vi.fn()
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()

    renderWithProviders(<LoginScreen onGuestLogin={onGuestLogin} />)
    await user.click(screen.getByRole('button', { name: /guest/i }))

    expect(onGuestLogin).toHaveBeenCalledTimes(1)
  })

  it('shows password input when Jigz card is clicked', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    renderWithProviders(<LoginScreen />)

    await user.click(screen.getByRole('button', { name: /jigz/i }))

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument()
  })

  it('shows error for incorrect password', async () => {
    const { default: userEvent } = await import('@testing-library/user-event')
    const user = userEvent.setup()
    renderWithProviders(<LoginScreen />)

    await user.click(screen.getByRole('button', { name: /jigz/i }))
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /enter/i }))

    expect(screen.getByText(/incorrect password/i)).toBeInTheDocument()
  })
})
