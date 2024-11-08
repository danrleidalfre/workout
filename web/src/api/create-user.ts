import { api } from '@/lib/axios'
import type { SignUpSchema } from '@/pages/login'

export async function createUser({
  name,
  email,
  password,
}: SignUpSchema): Promise<void> {
  await api.post('/users', { name, email, password })
}
