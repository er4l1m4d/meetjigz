import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { ToastProvider } from '../context/ToastContext.jsx'

export function renderWithProviders(ui, options = {}) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          {ui}
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>,
    options,
  )
}
