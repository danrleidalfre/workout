import { api } from '@/lib/axios'
import type { SignInSchema } from '@/pages/login'

export async function authenticateUser({
  email,
  password,
}: SignInSchema): Promise<string> {
  const { data } = await api.post('/sessions', { email, password })
  return data
}
