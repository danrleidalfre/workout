import { fetchWorkoutsCompletions } from '@/api/fetch-workouts-completions'
import { Tooltip } from '@/components/tooltip'
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
      <CardContent className="flex flex-col gap-2">
        {isLoading && <HomeCardSkeleton />}
        {workouts?.map(workout => (
          <div
            key={workout.id}
            className="border-b pb-3 flex items-center justify-between"
          >
            <div className="grid gap-1">
              <p className="font-bold text-base text-primary">
                {workout.workout}
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {workout.completedAgo}
              </p>
            </div>
            <div className="flex gap-2">
              <Tooltip content={workout.duration}>
                <Clock
                  strokeWidth={1}
                  className="size-5 text-muted-foreground"
                />
              </Tooltip>
              <Tooltip content={`${workout.load}kg`}>
                <Weight
                  strokeWidth={1}
                  className="size-5 text-muted-foreground"
                />
              </Tooltip>
              <Tooltip content={`${workout.series} séries`}>
                <Repeat
                  strokeWidth={1}
                  className="size-5 text-muted-foreground"
                />
              </Tooltip>
              <Tooltip content={`${workout.exercises} exercícios`}>
                <Dumbbell
                  strokeWidth={1}
                  className="size-5 text-muted-foreground -rotate-45"
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
