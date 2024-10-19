import { api } from '@/lib/axios'

type SeriesByGroup = {
  group: string
  series: number
}

export async function fetchSeriesByGroupCompletions(): Promise<
  SeriesByGroup[]
> {
  const { data } = await api.get('/workouts/series-by-group-completions')
  return data
}
