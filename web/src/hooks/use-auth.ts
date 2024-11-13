import { api } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const queryClient = useQueryClient()

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  )

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  useEffect(() => {
    const subscribe = api.interceptToken(logout)

    return () => {
      subscribe()
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    queryClient.invalidateQueries()
  }

  return { isAuthenticated, login, logout }
}
