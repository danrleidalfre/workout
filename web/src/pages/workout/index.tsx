import type { Workout as WorkoutProps } from '@/api/create-workout'
import { useParams } from 'react-router-dom'
import { WorkoutForm } from './form'

export function Workout() {
  const { id } = useParams()

  const handleSubmit = (data: WorkoutProps) => {
    console.log(data)
  }

  return <WorkoutForm handleSubmitForm={handleSubmit} />
}
