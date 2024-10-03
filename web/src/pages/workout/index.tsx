import {
  type Workout as WorkoutBody,
  createWorkout,
} from '@/api/create-workout'
import { fetchWorkout } from '@/api/fetch-workout'
import { updateWorkout } from '@/api/update-workout'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkoutForm } from './form'
import { WorkoutFormSkeleton } from './form/skeleton'

export function Workout() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: workout, isLoading } = useQuery({
    queryKey: ['workout', id],
    queryFn: () => (id ? fetchWorkout(id) : Promise.reject()),
    enabled: !!id,
  })

  const handleSubmit = async (workout: WorkoutBody) => {
    setIsSubmitting(true)

    if (id) {
      await updateWorkout({ id, workout })
    } else {
      await createWorkout(workout)
    }

    setIsSubmitting(false)
    navigate('/workouts')
  }

  return (
    <>
      {isLoading ? (
        <WorkoutFormSkeleton />
      ) : (
        <WorkoutForm
          workout={workout}
          handleSubmitForm={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
