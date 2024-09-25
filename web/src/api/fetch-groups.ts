import { api } from '@/lib/axios'

type Group = {
  id: string
  group: string
}

export async function fetchGroups(): Promise<Group[]> {
  const { data } = await api.get('/groups')
  return data
}
