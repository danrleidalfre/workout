import { fetchDurationByWeekCompletions } from '@/api/fetch-duration-by-week-completions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, XAxis, YAxis } from 'recharts'

const config = {
  time: {
    label: 'Duração',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function HomeChartDurationWorkoutsByWeek() {
  const { data } = useQuery({
    queryKey: ['workouts-duration-by-week-completions'],
    queryFn: fetchDurationByWeekCompletions,
    staleTime: 60 * 1000,
  })

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Duração de treino</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="week" hide />
            <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
            <defs>
              <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-time)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-time)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="duration"
              type="natural"
              fill="url(#fillTime)"
              fillOpacity={0.4}
              stroke="var(--color-time)"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={value => (
                <div className="flex justify-between min-w-[120px] items-center text-xs text-muted-foreground">
                  Duração
                  <div className="flex font-medium text-foreground">
                    {value}h
                  </div>
                </div>
              )}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
