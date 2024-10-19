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

export async function fetchSeriesByGroupCompletions(): Promise<
  WorkoutCompletion[]
> {
  const { data } = await api.get('/workouts/series-by-group-completions')
  return data
}
