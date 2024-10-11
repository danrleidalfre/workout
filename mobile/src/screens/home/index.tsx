import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "@/components/ui/icons/chevron-right";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

type Workout = {
  id: string
  title: string
  groups: string[]
}

export function Home() {
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

  function handleNavigateToWorkout(id: string) {
    console.log(id);
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <View className="flex-1 bg-foreground dark:bg-background">
      {isLoading ? Array.from({ length: 10 }).map((_, i) => {
        return (
          <View key={i} className="border-b border-primary p-5 flex-row justify-between items-center">
            <Skeleton className="h-10 w-24" />
            <View className="flex-row gap-1">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-14" />
            </View>
          </View>
        )
      }) : (
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <View key={item.id} className="border-b border-primary p-5 flex-row justify-between items-center">
              <Button
                label={item.title}
                icon={ChevronRight}
                iconAfterLabel
                onPress={() => handleNavigateToWorkout(item.id)}
              />
              <View className="flex-row gap-1">
                {item.groups.map(group => (
                  <Badge key={group} label={group} variant="secondary" />
                ))}
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}