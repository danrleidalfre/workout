import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Skeleton } from "@/components/skeleton";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Workout = {
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

  function handleNavigateToWorkout(id: string) {
    console.log(id);
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <View className="flex-1 bg-foreground dark:bg-background px-8">
      {isLoading ? Array.from({ length: 10 }).map((_, i) => {
        return (
          <View key={i} className="border border-card dark:border-card-foreground p-4 justify-between mt-4 rounded-md gap-2">
            <View className="flex-row justify-between w-full">
              <Skeleton className="h-7 w-24" />
              <View className="flex-row gap-1">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-7 w-14" />
                <Skeleton className="h-7 w-18" />
              </View>
            </View>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full" />
          </View>
        )
      }) : (
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <View key={item.id} className="border border-card dark:border-card-foreground p-4 justify-between mt-4 rounded-md gap-2">
              <View className="flex-row justify-between w-full">
                <Text className="text-muted dark:text-muted-foreground text-xl font-bold">{item.title}</Text>
                <View className="flex-row gap-1">
                  {item.groups.map(group => (
                    <Badge key={group} label={group} variant="secondary" />
                  ))}
                </View>
              </View>
              <Text className="text-muted dark:text-muted-foreground text-base line-clamp-1">{item.exercises}</Text>
              <Button
                label="Iniciar"
                onPress={() => handleNavigateToWorkout(item.id)}
              />
            </View>
          )}
        />
      )}
    </View>
  )
}