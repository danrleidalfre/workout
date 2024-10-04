import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './header'

export function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <main
        className={cn(
          'flex flex-1 flex-col py-4 px-4 mx-auto',
          pathname === '/' ? 'w-[1280px]' : 'w-[1024px]'
        )}
      >
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
