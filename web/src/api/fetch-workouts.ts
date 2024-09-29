import { api } from '@/lib/axios'

export type Workout = {
  id: string
  title: string
  groups: string[]
  exercises: string
}

export async function fetchWorkouts(): Promise<Workout[]> {
  const { data } = await api.get('/workouts')
  return data
}
