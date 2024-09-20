import { Exercises } from '@/pages/exercises'
import { Home } from '@/pages/home'
import { Workouts } from '@/pages/workouts'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/workouts', element: <Workouts /> },
  { path: '/exercises', element: <Exercises /> },
])
