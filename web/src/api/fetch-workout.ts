import { api } from '@/lib/axios'
import type { Workout } from './create-workout'

export async function fetchWorkout(id: string): Promise<Workout> {
  const { data } = await api.get(`/workouts/${id}`)
  return data
}
