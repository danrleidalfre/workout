import { api } from '@/lib/axios'

type Series = {
  load: string
  reps: string
}

type Exercise = {
  exerciseId: string
  rest: string
  note: string
  series: Series[]
}

export type Workout = {
  title: string
  exercises: Exercise[]
}

export async function createWorkout(workout: Workout): Promise<void> {
  await api.post('/workouts', workout)
}
