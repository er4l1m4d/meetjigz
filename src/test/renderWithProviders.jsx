import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'

export function renderWithProviders(ui, options = {}) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>,
    options,
  )
}
