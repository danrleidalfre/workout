import { fetchDurationByWeekCompletions } from '@/api/fetch-duration-by-week-completions'
import { fetchSeriesByGroupCompletions } from '@/api/fetch-series-by-group-completions'
import { fetchVolumeByWeekCompletions } from '@/api/fetch-volume-by-week-completions'
import { fetchWorkoutsByMonthCompletions } from '@/api/fetch-workouts-by-month-completions'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { subMonths } from 'date-fns'
import { HomeCard } from './card'
import { HomeChartDurationWorkoutsByWeek } from './charts/duration-workouts-by-week'
import { HomeChartSeriesByGroup } from './charts/series-by-group'
import { HomeChartTotalWorkoutsByMonth } from './charts/total-workouts-by-month'
import { HomeChartVolumeWorkoutsByWeek } from './charts/volume-workouts-by-week'

export function Home() {
  const { isFetching: isLoadingWorkoutsByMonth } = useQuery({
    queryKey: ['workouts-by-month-completions'],
    queryFn: fetchWorkoutsByMonthCompletions,
  })

  const { data: initialDataSeriesByGroup, isFetching: isLoadingSeriesByGroup } =
    useQuery({
      queryKey: ['workouts-series-by-group-completions'],
      queryFn: () =>
        fetchSeriesByGroupCompletions({
          start: subMonths(new Date(), 6),
          end: new Date(),
        }),
    })

  const { isFetching: isLoadingDurationByWeek } = useQuery({
    queryKey: ['workouts-duration-by-week-completions'],
    queryFn: fetchDurationByWeekCompletions,
  })

  const { isFetching: isLoadingVolumeByWeek } = useQuery({
    queryKey: ['workouts-volume-by-week-completions'],
    queryFn: fetchVolumeByWeekCompletions,
  })

  return (
    <div className="grid grid-cols-[3fr_4fr_3fr] gap-4 min-h-[calc(100vh-26rem)]">
      <div className="grid gap-4">
        <HomeCard />
        {isLoadingWorkoutsByMonth ? (
          <Skeleton className="size-full" />
        ) : (
          <HomeChartTotalWorkoutsByMonth />
        )}
      </div>
      {isLoadingSeriesByGroup ? (
        <Skeleton className="size-full" />
      ) : (
        <HomeChartSeriesByGroup initialData={initialDataSeriesByGroup} />
      )}
      <div className="grid gap-4">
        {isLoadingVolumeByWeek ? (
          <Skeleton className="size-full" />
        ) : (
          <HomeChartVolumeWorkoutsByWeek />
        )}
        {isLoadingDurationByWeek ? (
          <Skeleton className="size-full" />
        ) : (
          <HomeChartDurationWorkoutsByWeek />
        )}
      </div>
    </div>
  )
}
