import { fetchWorkoutsCompletions } from '@/api/fetch-workouts-completions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { Clock, Dumbbell, Repeat, Weight } from 'lucide-react'
import { HomeCardSkeleton } from './skeleton'

export function HomeCard() {
  const { data: workouts, isLoading } = useQuery({
    queryKey: ['workouts-completions'],
    queryFn: fetchWorkoutsCompletions,
    staleTime: 60 * 1000,
  })

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Últimos treinos realizados</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {isLoading && <HomeCardSkeleton />}
        {workouts?.map(workout => (
          <div key={workout.id} className="grid gap-1">
            <div className="flex justify-between items-center">
              <p className="font-bold text-base text-primary">
                {workout.workout}
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                {workout.completedAgo}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground flex gap-1">
                <Clock strokeWidth={1} className="size-4" />
                {workout.duration}
              </p>
              <p className="text-xs text-muted-foreground flex gap-1">
                <Weight strokeWidth={1} className="size-4" />
                {`${workout.load}kg`}
              </p>
              <p className="text-xs text-muted-foreground flex gap-1">
                <Repeat strokeWidth={1} className="size-4" />
                {`${workout.series} séries`}
              </p>
              <p className="text-xs text-muted-foreground flex gap-1">
                <Dumbbell strokeWidth={1} className="size-4 -rotate-45" />
                {`${workout.exercises} exercícios`}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
