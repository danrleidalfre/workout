import { fetchVolumeByWeekCompletions } from '@/api/fetch-volume-by-week-completions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, XAxis } from 'recharts'

const config = {
  volume: {
    label: 'Volume',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function HomeChartVolumeWorkoutsByWeek() {
  const { data } = useQuery({
    queryKey: ['workouts-volume-by-week-completions'],
    queryFn: fetchVolumeByWeekCompletions,
    staleTime: 60 * 1000,
  })

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Volume de treino</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart accessibilityLayer data={data}>
            <XAxis dataKey="week" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={value => (
                <div className="flex justify-between min-w-[120px] items-center text-xs text-muted-foreground">
                  Volume
                  <div className="flex font-medium text-foreground">
                    {value}kg
                  </div>
                </div>
              )}
            />
            <Bar dataKey="volume" fill="var(--color-volume)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
