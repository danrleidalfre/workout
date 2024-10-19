import { api } from '@/lib/axios'

export async function fetchVolumeByWeekCompletions(): Promise<[]> {
  const { data } = await api.get('/workouts/volume-by-week-completions')
  return data
}
