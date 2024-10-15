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
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { WorkoutSkeleton } from "./skeleton";

type WorkoutScreenRouteProps = RouteProp<RoutesProps, 'workout'>;

type Workout = {
  title: string
  exercises: {
    exerciseId: string
    exerciseTitle: string
    series: {
      load: number
      reps: number
      completed: boolean
    }[]
  }[]
}

export function Workout() {
  const { params } = useRoute<WorkoutScreenRouteProps>();
  const { id } = params;
  const { onSetTitle } = useHeaderTitle()

  const [workout, setWorkout] = useState({} as Workout)
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {} as Workout
  });

  async function fetchWorkout() {
    try {
      setIsLoading(true)

      const { data } = await api.get<Workout>(`/workouts/${id}`)

      reset({
        exercises: data.exercises.map((exercise) => ({
          ...exercise,
          series: exercise.series.map(({ load, reps, completed }) => ({
            load,
            reps,
            completed,
          })),
        })),
      });

      setWorkout(data)
      onSetTitle(data.title)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkout()
  }, [])

  const onSubmit = (workout: Workout) => {
    console.log(workout);
  };

  return (
    <>
      <Header />
      <ScrollView className="flex-1 bg-foreground dark:bg-background px-8 pt-4">
        {isLoading ? <WorkoutSkeleton /> : (
          <>
            <View className="gap-4">
              {workout.exercises?.map((exercise, exerciseIndex) => (
                <View key={exercise.exerciseId} className="gap-2">
                  <Text className="text-primary font-semibold text-xl">
                    {exerciseIndex + 1}º {exercise.exerciseTitle}
                  </Text>

                  <View className="flex-row gap-2">
                    <Text className="text-muted dark:text-muted-foreground text-base flex-[0.1]">
                      Série
                    </Text>
                    <Text className="text-muted dark:text-muted-foreground text-base flex-[0.4]">
                      Carga
                    </Text>
                    <Text className="text-muted dark:text-muted-foreground text-base flex-[0.4]">
                      Repetições
                    </Text>
                    <Check size={16} className="text-muted dark:text-muted-foreground text-base flex-[0.1]" />
                  </View>

                  {exercise.series.map((_, serieIndex) => (
                    <View key={serieIndex} className="flex-row gap-2">
                      <View className="size-10 items-center justify-center border border-input rounded-md flex-[0.1]">
                        <Text className="text-muted dark:text-muted-foreground">{serieIndex + 1}ª</Text>
                      </View>

                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.load`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value === 0 ? '' : String(value)}
                            onChangeText={onChange}
                            className="flex-[0.4]"
                          />
                        )}
                      />

                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.reps`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            value={value === 0 ? '' : String(value)}
                            onChangeText={onChange}
                            className="flex-[0.4]"
                          />
                        )}
                      />

                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.completed`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                            className="flex-[0.1]"
                          />
                        )}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View className="flex-row mt-4 gap-4 mb-60">
              <Button label="Descartar" icon={Trash2} variant="destructive" className="flex-[0.5]" />
              <Button
                label="Concluir"
                icon={CheckCircle2}
                className="flex-[0.5]"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  )
}