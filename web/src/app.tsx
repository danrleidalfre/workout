import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/layouts/app/header/toggle-theme/provider'
import { queryClient } from '@/lib/query'
import { router } from '@/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
