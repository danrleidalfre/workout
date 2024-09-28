import { api } from '@/lib/axios'

type CreateExerciseBody = {
  title: string
  groupId: string
}

export async function createExercise({
  title,
  groupId,
}: CreateExerciseBody): Promise<void> {
  await api.post('/exercises', { title, groupId })
}
