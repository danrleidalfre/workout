import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './header'

export function AppLayout() {
  const { pathname } = useLocation()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    isAuthenticated && (
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
      </div>
    )
  )
}
