import { fetchExercises } from '@/api/fetch-exercises'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ExerciseCard } from './card'
import { ExerciseCardSkeleton } from './card/skeleton'
import { ExerciseFilter } from './filter'
import { ExerciseForm } from './form'

export function Exercises() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const groupId = searchParams.get('groupId')

  const { data: exercises } = useQuery({
    queryKey: ['exercises', search, groupId],
    queryFn: () => fetchExercises({ search: null, groupId: null }),
    staleTime: 60 * 1000,
  })

  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <ExerciseFilter />
        <Button
          onClick={() => setIsFormOpen(true)}
          className="items-center gap-1"
        >
          <PlusCircle className="size-4" /> Exercício
        </Button>
        <ExerciseForm open={isFormOpen} onOpenChange={setIsFormOpen} />
      </div>
      {exercises?.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
      {!exercises && <ExerciseCardSkeleton />}
    </div>
  )
}
