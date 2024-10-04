import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, XAxis } from 'recharts'

const chartData = [
  { month: '17/09 - 24/09', volume: 50 },
  { month: '25/09 - 31/09', volume: 70 },
  { month: '01/09 - 07/09', volume: 60 },
  { month: '08/09 - 14/09', volume: 55 },
  { month: '15/09 - 21/09', volume: 65 },
  { month: '22/09 - 28/09', volume: 70 },
  { month: 'Semana atual', volume: 30 },
]

const chartConfig = {
  volume: {
    label: 'Volume',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function HomeChartBar() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Volume de treino</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis dataKey="month" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={value => (
                <div className="flex justify-between min-w-[120px] items-center text-xs text-muted-foreground">
                  Volume
                  <div className="flex font-medium text-foreground">
                    {value}k
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
