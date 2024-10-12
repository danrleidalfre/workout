import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { WorkoutCard } from "./card";
import { WorkoutCardSkeleton } from "./card/skeleton";

export type Workout = {
  id: string
  title: string
  exercises: string
  groups: string[]
}

export function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function fetchWorkouts() {
    try {
      setIsLoading(true)

      const { data } = await api.get<Workout[]>('/workouts')

      setWorkouts(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <>
      {isLoading ? <WorkoutCardSkeleton /> : (
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <WorkoutCard key={item.id} workout={item} />
          )}
        />
      )}
    </>
  )
}