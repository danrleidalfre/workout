'use client'

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

import { fetchWorkoutsByMonthCompletions } from '@/api/fetch-workouts-by-month-completions'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'

const config = {
  workouts: {
    label: 'Treinos',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

export function HomeChartTotalWorkoutsByMonth() {
  const { data } = useQuery({
    queryKey: ['workouts-by-month-completions'],
    queryFn: fetchWorkoutsByMonthCompletions,
    staleTime: 60 * 1000,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Total de treinos</CardTitle>
        <CardDescription>nos últimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="workouts" type="number" hide />
            <Bar
              dataKey="workouts"
              layout="vertical"
              fill="var(--color-workouts)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="workouts"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
