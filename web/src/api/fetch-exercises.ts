import { api } from '@/lib/axios'

type Exercise = {
  id: string
  exercise: string
  group: string
}

export async function fetchExercises(): Promise<Exercise[]> {
  const { data } = await api.get('/exercises')
  return data
}
