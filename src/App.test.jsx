import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { PortfolioProvider } from './context/PortfolioContext.jsx'

describe('App', () => {
  it('renders the portfolio immediately', () => {
    render(
      <ThemeProvider>
        <PortfolioProvider>
          <ToastProvider><App /></ToastProvider>
        </PortfolioProvider>
      </ThemeProvider>,
    )
    expect(screen.getByRole('heading', { name: /design.*build digital.*products/i })).toBeInTheDocument()
  })
})
