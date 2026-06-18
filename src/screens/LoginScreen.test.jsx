import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import LoginScreen from './LoginScreen.jsx'
import { renderWithProviders } from '../test/renderWithProviders.jsx'

describe('LoginScreen', () => {
  it('renders both profile cards', () => {
    renderWithProviders(<LoginScreen />)
    expect(screen.getByRole('button', { name: /jigz/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /guest/i })).toBeInTheDocument()
  })

  it('calls onGuestLogin when guest card is clicked', async () => {
    const onGuestLogin = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<LoginScreen onGuestLogin={onGuestLogin} />)
    await user.click(screen.getByRole('button', { name: /guest/i }))

    expect(onGuestLogin).toHaveBeenCalledTimes(1)
  })

  it('shows password input when Jigz card is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginScreen />)

    await user.click(screen.getByRole('button', { name: /jigz/i }))

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument()
  })

  it('shows error for incorrect password', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginScreen />)

    await user.click(screen.getByRole('button', { name: /jigz/i }))
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /enter/i }))

    expect(screen.getByText(/incorrect password/i)).toBeInTheDocument()
  })
})
