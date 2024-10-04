import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const chartData = [
  { group: 'Pernas', series: 186 },
  { group: 'Costas', series: 305 },
  { group: 'Peito', series: 237 },
  { group: 'Braços', series: 273 },
  { group: 'Ombros', series: 209 },
]

const chartConfig = {
  series: {
    label: 'Séries',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function HomeChartRadar() {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Séries por agrupamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <RadarChart data={chartData}>
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
