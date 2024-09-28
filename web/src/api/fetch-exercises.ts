import { api } from '@/lib/axios'

type Filter = {
  search: string | null
  groupId: string | null
}

export type Exercise = {
  id: string
  exercise: string
  group: string
}

export async function fetchExercises({
  search,
  groupId,
}: Filter): Promise<Exercise[]> {
  const { data } = await api.get('/exercises', {
    params: {
      search,
      groupId,
    },
  })
  return data
}
