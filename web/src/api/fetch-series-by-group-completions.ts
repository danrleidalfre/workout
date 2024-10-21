import { api } from '@/lib/axios'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

export type SeriesByGroup = {
  group: string
  series: number
}

type FetchSeriesByGroupParams = {
  start: DateRange['from'] | undefined
  end: DateRange['to'] | undefined
}

export async function fetchSeriesByGroupCompletions({
  start,
  end,
}: FetchSeriesByGroupParams): Promise<SeriesByGroup[]> {
  const { data } = await api.get('/workouts/series-by-group-completions', {
    params: {
      start: start && format(start, 'yyyy-MM-dd'),
      end: end && format(end, 'yyyy-MM-dd'),
    },
  })

  return data
}
