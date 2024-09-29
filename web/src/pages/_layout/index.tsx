import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import { Header } from './header'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <main className="flex flex-1 flex-col py-4 px-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
