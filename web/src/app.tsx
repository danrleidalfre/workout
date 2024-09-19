import { BicepsFlexed } from "lucide-react";
import { Button } from "./components/ui/button";

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
