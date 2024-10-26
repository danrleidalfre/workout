import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { Workout as WorkoutForm } from "@/screens/workout";
import { getWorkout } from "@/storage/workout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
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
  const [workoutAlreadyStarted, setWorkoutAlreadyStarted] = useState({} as WorkoutForm)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();

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

  const getWorkoutStorage = async () => {
    const workout = await getWorkout()
    setWorkoutAlreadyStarted(workout)
  }

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
      getWorkoutStorage();
    }, [])
  );

  return (
    <>
      <Header />
      <View className="flex-1 bg-foreground dark:bg-background px-4">
        {workoutAlreadyStarted.title && (
          <Text className="text-muted dark:text-muted-foreground">Treino {workoutAlreadyStarted.title} já em andamento</Text>
        )}
        {isLoading ? <WorkoutCardSkeleton /> : (
          <FlatList
            data={workouts}
            renderItem={({ item }) => (
              <WorkoutCard key={item.id} workout={item} />
            )}
          />
        )}
      </View>
    </>
  )
}