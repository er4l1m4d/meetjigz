import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

function renderApp() {
  return render(
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>,
  )
}

describe('App', () => {
  it('renders the boot screen on initial load', () => {
    renderApp()
    expect(screen.getByRole('region', { name: /boot sequence/i })).toBeInTheDocument()
  })
})
