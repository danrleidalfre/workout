import { Outlet } from 'react-router-dom'
import { Header } from './header'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-8">
        <Outlet />
      </main>
    </div>
  )
}
