import { api } from '@/lib/axios'

export type UpdateExerciseBody = {
  id: string
  title: string
  groupId: string
}

export async function updateExercise({
  id,
  title,
  groupId,
}: UpdateExerciseBody): Promise<void> {
  await api.put(`/exercises/${id}`, { title, groupId })
}
