import { api } from '@/lib/axios'

type User = {
  name: string
  email: string
}

export async function fetchUser(): Promise<User> {
  const { data } = await api.get('/sessions')
  return data
}
