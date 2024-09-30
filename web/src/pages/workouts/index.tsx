import { fetchWorkouts } from '@/api/fetch-workouts'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { WorkoutCard } from './card'
import { WorkoutCardSkeleton } from './card/skeleton'
import { WorkoutFilter } from './filter'

export function Workouts() {
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { data: workouts } = useQuery({
    queryKey: ['workouts', search],
    queryFn: () => fetchWorkouts({ search: null }),
  })

  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <WorkoutFilter />
        <Button className="items-center gap-1">
          <PlusCircle className="size-4" />
          <span>Treino</span>
        </Button>
      </div>
      {workouts?.map(workout => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
      {!workouts && <WorkoutCardSkeleton />}
    </div>
  )
}
