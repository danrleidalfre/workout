import { AppLayout } from '@/layouts/app'
import { Exercises } from '@/pages/exercises'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { Workout } from '@/pages/workout'
import { Workouts } from '@/pages/workouts'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

function AuthGuard({ children }: { children: JSX.Element }) {
  const { userId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [userId, navigate])

  return userId ? children : null
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: 'workouts', element: <Workouts /> },
      { path: 'exercises', element: <Exercises /> },
      { path: 'workout/:id?', element: <Workout /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
