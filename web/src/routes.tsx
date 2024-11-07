import { AppLayout } from '@/layouts/app'
import { AuthLayout } from '@/layouts/auth'
import { Exercises } from '@/pages/exercises'
import { Home } from '@/pages/home'
import { Login } from '@/pages/login'
import { Workout } from '@/pages/workout'
import { Workouts } from '@/pages/workouts'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'workouts', element: <Workouts /> },
      { path: 'exercises', element: <Exercises /> },
      { path: 'workout/:id?', element: <Workout /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
])
