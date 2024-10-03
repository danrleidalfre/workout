import {
  type Workout as WorkoutBody,
  createWorkout,
} from '@/api/create-workout'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkoutForm } from './form'

export function Workout() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (workout: WorkoutBody) => {
    setIsSubmitting(true)
    await createWorkout(workout)
    setIsSubmitting(false)
    navigate('/workouts')
  }

  return (
    <WorkoutForm handleSubmitForm={handleSubmit} isSubmitting={isSubmitting} />
  )
}
