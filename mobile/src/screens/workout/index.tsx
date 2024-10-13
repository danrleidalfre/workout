import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { Check } from "@/components/icons/check";
import { Input } from "@/components/input";
import { api } from "@/lib/axios";
import { RoutesProps } from "@/routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type WorkoutScreenRouteProps = RouteProp<RoutesProps, 'workout'>;

type Workout = {
  title: string
  exercises: {
    exerciseId: string
    exerciseTitle: string
    series: {
      reps: number
      load: number
    }[]
  }[]
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
      <View className="flex-1 bg-foreground dark:bg-background px-8 pt-4">
        <Text className="text-muted dark:text-muted-foreground text-xl font-bold">{workout.title}</Text>
        {workout.exercises?.map((exercise) => (
          <View key={exercise.exerciseId}>
            <Text className="text-muted dark:text-muted-foreground text-lg">{exercise.exerciseTitle}</Text>
            <View className="gap-2">
              <View className="flex-row gap-2">
                <Text className="text-muted dark:text-muted-foreground text-base flex-[0.1]">Série</Text>
                <Text className="text-muted dark:text-muted-foreground text-base flex-[0.4]">Carga</Text>
                <Text className="text-muted dark:text-muted-foreground text-base flex-[0.4]">Repetições</Text>
                <Check size={20} className="text-muted dark:text-muted-foreground text-base flex-[0.1]" />
              </View>
              {exercise.series.map((serie, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <View className="size-10 items-center justify-center border border-input rounded-md flex-[0.1]">
                    <Text className="text-muted dark:text-muted-foreground">{index + 1}</Text>
                  </View>
                  <Input value={String(serie.load)} className="flex-[0.4]" />
                  <Input value={String(serie.reps)} className="flex-[0.4]" />
                  <Checkbox className="flex-[0.1]" />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

    </>
  )
}