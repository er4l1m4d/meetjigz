import { render } from '@testing-library/react'
import { ThemeProvider } from '../context/ThemeContext.jsx'

export function renderWithProviders(ui, options = {}) {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>,
    options,
  )
}
