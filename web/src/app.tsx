import { ThemeProvider } from '@/pages/_layout/header/toggle-theme/provider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
