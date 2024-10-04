import { Area, AreaChart, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  {
    date: '17/09 - 24/09',
    time: 20,
  },
  {
    date: '25/09 - 31/09',
    time: 18,
  },
  {
    date: '01/09 - 07/09',
    time: 15,
  },
  {
    date: '08/09 - 14/09',
    time: 17,
  },
  {
    date: '15/09 - 21/09',
    time: 22,
  },
  {
    date: '22/09 - 28/09',
    time: 20,
  },
  {
    date: 'Semana atual',
    time: 10,
  },
]

const chartConfig = {
  time: {
    label: 'Duração',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function HomeChartArea() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Duração de treino</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" hide />
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
              dataKey="time"
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
