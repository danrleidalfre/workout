import { fetchExercises } from '@/api/fetch-exercises'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { ExerciseCard } from './card'
import { ExerciseCardSkeleton } from './card/skeleton'
import { ExerciseFilter } from './filter'
import { ExerciseForm } from './form'

export function Exercises() {
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const groupId = searchParams.get('groupId')

  const { data: exercises } = useQuery({
    queryKey: ['exercises', search, groupId],
    queryFn: () => fetchExercises({ search: null, groupId: null }),
    staleTime: 1000 * 60,
  })

  return (
    <>
      <div className="flex justify-between mb-4">
        <ExerciseFilter />
        <ExerciseForm />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {exercises?.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
        {!exercises && <ExerciseCardSkeleton />}
      </div>
    </>
  )
}
