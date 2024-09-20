import { Button } from '@/components/ui/button'
import { BicepsFlexed } from 'lucide-react'

export function App() {
  return (
    <h1 className="flex justify-center items-center h-screen">
      <Button>
        <BicepsFlexed className="size-5" />
        <span>Workout</span>
      </Button>
    </h1>
  )
}
