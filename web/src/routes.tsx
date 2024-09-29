import { Exercises } from '@/pages/exercises'
import { Home } from '@/pages/home'
import { Workouts } from '@/pages/workouts'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/workouts', element: <Workouts /> },
      { path: '/exercises', element: <Exercises /> },
    ],
  },
])
