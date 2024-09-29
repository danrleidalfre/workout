import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import { Header } from './header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <main className="flex flex-1 flex-col py-4 px-8 w-[1024px] mx-auto">
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
