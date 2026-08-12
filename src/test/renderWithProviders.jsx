import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { ToastProvider } from '../context/ToastContext.jsx'
import { PortfolioProvider } from '../context/PortfolioContext.jsx'

export function renderWithProviders(ui, options = {}) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <ToastProvider>
            {ui}
          </ToastProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>,
    options,
  )
}
