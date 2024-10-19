import { api } from '@/lib/axios'

type WorkoutCompletion = {
  id: string
  workout: string
  completedAgo: string
  duration: string
  load: number
  exercises: number
  series: number
}

export async function fetchWorkoutsCompletions(): Promise<WorkoutCompletion[]> {
  const { data } = await api.get('workouts/completions')
  return data
}
