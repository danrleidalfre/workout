import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { CheckCircle2 } from "@/components/icons/check-circle";
import { Dumbbell } from "@/components/icons/dumbbell";
import { Trash2 } from "@/components/icons/trash";
import { Input } from "@/components/input";
import { Progress } from "@/components/progress";
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
  const { onSetTitle } = useHeaderTitle();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {} as Workout,
  });

  async function fetchWorkout() {
    try {
      setIsLoading(true);

      const { data } = await api.get<Workout>(`/workouts/${id}`);

      reset({
        title: data.title,
        exercises: data.exercises.map((exercise) => ({
          ...exercise,
          series: exercise.series.map(({ load, reps, completed }) => ({
            load,
            reps,
            completed,
          })),
        })),
      });

      onSetTitle(data.title);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkout();
  }, []);

  const onSubmit = (workout: Workout) => {
    console.log(workout);
  };

  const workout = watch();

  const calculateProgress = () => {
    if (!workout.exercises) return 0;

    const { totalSeries, completedSeries } = workout.exercises.reduce(
      (acc, exercise) => {
        const seriesStats = exercise.series.reduce(
          (seriesAcc, serie) => {
            seriesAcc.total += 1;
            if (serie.completed) {
              seriesAcc.completed += 1;
            }
            return seriesAcc;
          },
          { total: 0, completed: 0 }
        );

        acc.totalSeries += seriesStats.total;
        acc.completedSeries += seriesStats.completed;

        return acc;
      },
      { totalSeries: 0, completedSeries: 0 }
    );

    return totalSeries > 0 ? (completedSeries / totalSeries) * 100 : 0;
  };

  const progress = calculateProgress();

  return (
    <>
      <Header />
      <Progress value={progress} />
      <ScrollView className="flex-1 bg-foreground dark:bg-background px-8 pt-4">
        {isLoading ? <WorkoutSkeleton /> : (
          <>
            <View className="gap-6">
              {workout.exercises?.map((exercise, exerciseIndex) => (
                <View key={exercise.exerciseId} className="gap-3">
                  <View className="flex-row items-center gap-3">
                    <View className="size-10 items-center justify-center">
                      <Dumbbell className="text-primary -rotate-45" size={28} />
                    </View>
                    <Text className="text-primary font-semibold text-xl">
                      {exercise.exerciseTitle}
                    </Text>
                  </View>

                  {exercise.series.map((_, serieIndex) => (
                    <View key={serieIndex} className="flex-row gap-3">
                      <View className="size-10 items-center justify-center border-0.5 border-input rounded-md flex-[0.1]">
                        <Text className="text-muted dark:text-muted-foreground">{serieIndex + 1}ª</Text>
                      </View>

                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.load`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <View className="flex-row items-center flex-[0.4] gap-2" >
                            <Input
                              value={value === 0 ? '' : String(value)}
                              onChangeText={onChange}
                              className="flex-[0.85]"
                            />
                            <Text className="text-muted dark:text-muted-foreground flex-[0.15]">
                              kg
                            </Text>
                          </View>
                        )}
                      />

                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.reps`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <View className="flex-row items-center flex-[0.4] gap-2" >
                            <Input
                              value={value === 0 ? '' : String(value)}
                              onChangeText={onChange}
                              className="flex-[0.75]"
                            />
                            <Text className="text-muted dark:text-muted-foreground flex-[0.25]">
                              reps
                            </Text>
                          </View>
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
  );
}
