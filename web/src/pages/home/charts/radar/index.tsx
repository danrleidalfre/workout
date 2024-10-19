import { fetchSeriesByGroupCompletions } from '@/api/fetch-series-by-group-completions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const config = {
  series: {
    label: 'Séries',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function HomeChartRadar() {
  const { data } = useQuery({
    queryKey: ['workouts-series-by-group-completions'],
    queryFn: fetchSeriesByGroupCompletions,
    staleTime: 60 * 1000,
  })

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Séries por agrupamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto aspect-square">
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
