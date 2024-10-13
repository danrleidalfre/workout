import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { RoutesProps } from "@/routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type WorkoutScreenRouteProps = RouteProp<RoutesProps, 'workout'>;

type Workout = {
  title: string
}

export function Workout() {
  const { params } = useRoute<WorkoutScreenRouteProps>();
  const { id } = params;

  const [workout, setWorkout] = useState({} as Workout)

  async function fetchWorkout() {
    try {
      const { data } = await api.get<Workout>(`/workouts/${id}`)
      setWorkout(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWorkout()
  }, [])

  return (
    <>
      <Header />
      <View className="flex-1 bg-foreground dark:bg-background px-8">
        <Text className="text-muted dark:text-muted-foreground">{workout.title}</Text>
      </View>
    </>
  )
}