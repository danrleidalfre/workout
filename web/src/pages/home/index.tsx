import { fetchWorkoutsCompletions } from '@/api/fetch-workouts-completions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { Clock, Dumbbell, Repeat, Weight } from 'lucide-react'
import { HomeChartArea } from './charts/area'
import { HomeChartBar } from './charts/bar'
import { HomeChartRadar } from './charts/radar'

export function Home() {
  const { data: workouts, isLoading } = useQuery({
    queryKey: ['workouts-completions'],
    queryFn: fetchWorkoutsCompletions,
    staleTime: 60 * 1000,
  })

  return (
    <div className="grid grid-cols-[2fr_4fr_3fr] gap-4">
      <Card>
        <CardHeader className="items-center">
          <CardTitle>Últimos treinos realizados</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-5 w-28" />
                </div>
              </div>
            ))}
          {workouts?.map(workout => (
            <div key={workout.id} className="border-b pb-4 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <p className="font-bold text-base text-primary">
                  {workout.workout}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {workout.completedAgo}
                </p>
              </div>
              <div className="grid grid-cols-2">
                <div className="flex items-center gap-1">
                  <Clock className="size-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm font-light">
                    {workout.duration}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Weight className="size-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm font-light">
                    {workout.load} kg
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Repeat className="size-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm font-light">
                    {workout.series} séries
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="size-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm font-light">
                    {workout.exercises} exercícios
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <HomeChartRadar />
      <div className="grid gap-4">
        <HomeChartBar />
        <HomeChartArea />
      </div>
    </div>
  )
}
