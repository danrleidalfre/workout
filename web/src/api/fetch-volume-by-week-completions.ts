import { api } from '@/lib/axios'

type VolumeByWeek = {
  week: string
  volume: number
}

export async function fetchVolumeByWeekCompletions(): Promise<VolumeByWeek[]> {
  const { data } = await api.get('/workouts/volume-by-week-completions')
  return data
}
