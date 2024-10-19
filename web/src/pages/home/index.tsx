import { HomeCard } from './card'
import { HomeChartArea } from './charts/area'
import { HomeChartBar } from './charts/bar'
import { HomeChartRadar } from './charts/radar'

export function Home() {
  return (
    <div className="grid grid-cols-[2fr_4fr_3fr] gap-4">
      <HomeCard />
      <HomeChartRadar />
      <div className="grid gap-4">
        <HomeChartBar />
        <HomeChartArea />
      </div>
    </div>
  )
}
