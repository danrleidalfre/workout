import { api } from '@/lib/axios'

export async function deleteExercise(id: string): Promise<void> {
  await api.delete(`/exercises/${id}`)
}
