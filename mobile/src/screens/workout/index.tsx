import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { Check } from "@/components/icons/check";
import { CheckCircle2 } from "@/components/icons/check-circle";
import { Trash2 } from "@/components/icons/trash";
import { Input } from "@/components/input";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { api } from "@/lib/axios";
import { RoutesProps } from "@/routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { WorkoutSkeleton } from "./skeleton";

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
  const { onSetTitle } = useHeaderTitle()

  const [workout, setWorkout] = useState({} as Workout)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchWorkout() {
    try {
      setIsLoading(true)

      const { data } = await api.get<Workout>(`/workouts/${id}`)

      setWorkout(data)
      onSetTitle(data.title)
      setIsLoading(false)
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
      <ScrollView className="flex-1 bg-foreground dark:bg-background px-8 pt-4">
        {isLoading ? <WorkoutSkeleton /> : (
          <>
            <View className="gap-4">
              {workout.exercises?.map((exercise, index) => (
                <View key={exercise.exerciseId} className="gap-2">
                  <Text className="text-primary font-semibold text-lg">{index + 1}º {exercise.exerciseTitle}</Text>
                  <View className="flex-row gap-2">
                    <Text className="text-muted dark:text-muted-foreground text-base flex-[0.1]">Série</Text>
                    <Text className="text-muted dark:text-muted-foreground text-base flex-[0.4]">Carga</Text>
                    <Text className="text-muted dark:text-muted-foreground text-base flex-[0.4]">Repetições</Text>
                    <Check size={20} className="text-muted dark:text-muted-foreground text-base flex-[0.1]" />
                  </View>
                  {exercise.series.map((serie, index) => (
                    <View key={index} className="flex-row gap-2">
                      <View className="size-10 items-center justify-center border border-input rounded-md flex-[0.1]">
                        <Text className="text-muted dark:text-muted-foreground">{index + 1}ª</Text>
                      </View>
                      <Input value={String(serie.load)} className="flex-[0.4]" />
                      <Input value={String(serie.reps)} className="flex-[0.4]" />
                      <Checkbox className="flex-[0.1]" />
                    </View>
                  ))}
                </View>
              ))}
            </View>
            <View className="flex-row mt-4 gap-4 mb-60">
              <Button label="Descartar" icon={Trash2} variant="destructive" className="flex-[0.5]" />
              <Button label="Concluir" icon={CheckCircle2} className="flex-[0.5]" />
            </View>
          </>
        )}
      </ScrollView>
    </>
  )
}