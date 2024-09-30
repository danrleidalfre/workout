import { api } from '@/lib/axios'

type Filter = {
  search: string | null
}

export type Workout = {
  id: string
  title: string
  groups: string[]
  exercises: string
}

export async function fetchWorkouts({ search }: Filter): Promise<Workout[]> {
  const { data } = await api.get('/workouts', {
    params: {
      search,
    },
  })
  return data
}
