import { api } from '@/lib/axios'

export async function deleteWorkout(id: string): Promise<void> {
  await api.delete(`/workouts/${id}`)
}
