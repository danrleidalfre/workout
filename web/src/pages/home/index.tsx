import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronDown, ChevronUp, Minus } from 'lucide-react'
import { HomeChartArea } from './charts/area'
import { HomeChartBar } from './charts/bar'
import { HomeChartRadar } from './charts/radar'

export function Home() {
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Últimos treinos realizados</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-12" />
          ))}
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo com o mês anterior</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between gap-4">
                <div className="flex items-center">
                  <span className="flex flex-col items-center">
                    <span className="text-3xl font-bold">200</span>
                    <span className="font-medium">séries</span>
                  </span>
                  <Minus className="size-10" />
                </div>
                <div className="flex items-center text-primary">
                  <span className="flex flex-col items-center">
                    <span className="text-3xl font-bold">10k</span>
                    <span className="font-medium">volume</span>
                  </span>
                  <ChevronUp className="size-10" />
                </div>
                <div className="flex items-center text-destructive">
                  <span className="flex flex-col items-center">
                    <span className="text-3xl font-bold">1h</span>
                    <span className="font-medium">duração</span>
                  </span>
                  <ChevronDown className="size-10" />
                </div>
              </div>
            </CardContent>
          </Card>
          <HomeChartRadar />
        </div>
        <div className="grid gap-4">
          <HomeChartBar />
          <HomeChartArea />
        </div>
      </div>
    </div>
  )
}
