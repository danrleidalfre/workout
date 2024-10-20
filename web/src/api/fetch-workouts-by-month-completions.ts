import { api } from '@/lib/axios'

type WorkoutsByMonth = {
  month: string
  workouts: number
}

export async function fetchWorkoutsByMonthCompletions(): Promise<
  WorkoutsByMonth[]
> {
  const { data } = await api.get('/workouts/workouts-by-month-completions')
  return data
}
