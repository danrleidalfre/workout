import {
  type SeriesByGroup,
  fetchSeriesByGroupCompletions,
} from '@/api/fetch-series-by-group-completions'
import { DatePickerRange } from '@/components/date-picker-range'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const config = {
  series: {
    label: 'Séries',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type Props = {
  initialData: SeriesByGroup[] | undefined
}

export function HomeChartSeriesByGroup({ initialData }: Props) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const { data } = useQuery({
    queryKey: [
      'workouts-series-by-group-completions',
      dateRange?.from,
      dateRange?.to,
    ],
    queryFn: () =>
      fetchSeriesByGroupCompletions({
        start: dateRange?.from,
        end: dateRange?.to,
      }),
    enabled: !!dateRange?.from && !!dateRange.to,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>
            Séries por agrupamento
            <CardDescription>
              {dateRange?.from && dateRange.to
                ? `${format(dateRange?.from, 'dd/MM/yyyy')} a ${format(dateRange?.to, 'dd/MM/yyyy')}`
                : 'nos últimos meses'}
            </CardDescription>
          </div>
          <DatePickerRange onDateChange={setDateRange} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto aspect-square">
          <RadarChart data={data || initialData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={value => (
                <div className="flex justify-between min-w-[120px] items-center text-xs text-muted-foreground">
                  Séries
                  <div className="flex font-medium text-foreground">
                    {value}
                  </div>
                </div>
              )}
            />
            <PolarAngleAxis dataKey="group" />
            <PolarGrid />
            <Radar
              dataKey="series"
              fill="var(--color-series)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
