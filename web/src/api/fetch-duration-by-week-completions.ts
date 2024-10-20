import { api } from '@/lib/axios'

type DurationByWeek = {
  week: string
  duration: number
}

export async function fetchDurationByWeekCompletions(): Promise<
  DurationByWeek[]
> {
  const { data } = await api.get('/workouts/duration-by-week-completions')
  return data
}
