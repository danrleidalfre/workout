import { fetchDurationByWeekCompletions } from '@/api/fetch-duration-by-week-completions'
import { fetchSeriesByGroupCompletions } from '@/api/fetch-series-by-group-completions'
import { fetchVolumeByWeekCompletions } from '@/api/fetch-volume-by-week-completions'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { HomeCard } from './card'
import { HomeChartArea } from './charts/area'
import { HomeChartBar } from './charts/bar'
import { HomeChartRadar } from './charts/radar'

export function Home() {
  const { isFetching: isLoadingRadar } = useQuery({
    queryKey: ['workouts-series-by-group-completions'],
    queryFn: fetchSeriesByGroupCompletions,
  })

  const { isFetching: isLoadingArea } = useQuery({
    queryKey: ['workouts-duration-by-week-completions'],
    queryFn: fetchDurationByWeekCompletions,
  })

  const { isFetching: isLoadingBar } = useQuery({
    queryKey: ['workouts-volume-by-week-completions'],
    queryFn: fetchVolumeByWeekCompletions,
  })

  return (
    <div className="grid grid-cols-[2fr_4fr_3fr] gap-4">
      <HomeCard />
      {isLoadingRadar ? <Skeleton className="size-full" /> : <HomeChartRadar />}
      <div className="grid gap-4">
        {isLoadingBar ? <Skeleton className="size-full" /> : <HomeChartBar />}
        {isLoadingArea ? <Skeleton className="size-full" /> : <HomeChartArea />}
      </div>
    </div>
  )
}
