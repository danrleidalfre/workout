import { api } from '@/lib/axios'
import type { Workout } from './create-workout'

type updateWorkoutBody = {
  id: string
  workout: Workout
}

export async function updateWorkout({
  id,
  workout,
}: updateWorkoutBody): Promise<void> {
  await api.put(`/workouts/${id}`, workout)
}
