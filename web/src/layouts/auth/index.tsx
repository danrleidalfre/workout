import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return !isAuthenticated && <Outlet />
}
