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
import { AppNavigatorRoutesProps, RoutesProps } from "@/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { CountdownRest } from "./countdown-rest";
import { WorkoutSkeleton } from "./skeleton";

type WorkoutScreenRouteProps = RouteProp<RoutesProps, 'workout'>;

type Workout = {
  title: string;
  start: string;
  end: string;
  exercises: {
    exerciseId: string;
    exerciseTitle: string;
    rest: string;
    series: {
      serieId: string;
      load: number;
      reps: number;
      completed: boolean;
    }[];
  }[];
};

export function Workout() {
  const { params } = useRoute<WorkoutScreenRouteProps>();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { id } = params;
  const { onSetTitle } = useHeaderTitle();

  const [isLoading, setIsLoading] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [currentRestTime, setCurrentRestTime] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number | null>(null);

  const { control, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {} as Workout,
  });

  async function fetchWorkout() {
    try {
      setIsLoading(true);

      const { data } = await api.get<Workout>(`/workouts/${id}`);

      reset({
        title: data.title,
        start: new Date().toString(),
        exercises: data.exercises.map((exercise) => ({
          ...exercise,
          series: exercise.series.map(({ serieId, load, reps, completed }) => ({
            serieId,
            load,
            reps,
            completed,
          })),
        })),
      });

      onSetTitle(data.title);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkout();
  }, []);

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

  const onSubmit = async (workout: Workout) => {
    try {
      workout.end = new Date().toString();

      await api.post(`/workouts/${id}/completion`, { ...workout });

      navigation.navigate('workouts');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSerieComplete = (exerciseIndex: number, restTime: string) => {
    setIsCountdownActive(true);
    setCurrentRestTime(parseInt(restTime, 10));
    setCurrentExerciseIndex(exerciseIndex);
  };

  const handleCountdownComplete = () => {
    setIsCountdownActive(false);
    setCurrentExerciseIndex(null);
  };

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
                  <View className="flex-row justify-between items-center">
                    <View className="flex flex-row items-center gap-3">
                      <Dumbbell className="text-primary -rotate-45" size={28} />
                      <Text className="text-primary font-semibold text-xl">
                        {exercise.exerciseTitle}
                      </Text>
                    </View>
                    {currentExerciseIndex === exerciseIndex && (
                      <CountdownRest
                        restTime={currentRestTime}
                        start={isCountdownActive}
                        onComplete={handleCountdownComplete}
                      />
                    )}
                  </View>

                  {exercise.series.map((_, serieIndex) => (
                    <View key={serieIndex} className="flex-row gap-3">
                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.load`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <View className="flex-[0.45] flex-col justify-center">
                            <Input
                              value={value === 0 ? '' : String(value)}
                              onChangeText={onChange}
                              className="w-full"
                            />
                            <Text className="absolute right-4 text-base text-muted dark:text-muted-foreground opacity-50">
                              kg
                            </Text>
                          </View>
                        )}
                      />

                      <Controller
                        name={`exercises.${exerciseIndex}.series.${serieIndex}.reps`}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <View className="flex-[0.45] flex-col justify-center">
                            <Input
                              value={value === 0 ? '' : String(value)}
                              onChangeText={onChange}
                              className="w-full"
                            />
                            <Text className="absolute right-4 text-base text-muted dark:text-muted-foreground opacity-50">
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
                            onChange={(checked) => {
                              onChange(checked);
                              if (checked) {
                                handleSerieComplete(exerciseIndex, exercise.rest);
                              }
                            }}
                            className="flex-[0.1]"
                          />
                        )}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <View className="flex-row mt-6 gap-4 mb-60">
              <Button
                label="Descartar"
                icon={Trash2}
                variant="destructive"
                className="flex-[0.5]"
                onPress={() => navigation.navigate('workouts')}
              />
              <Button
                label={isSubmitting ? 'Finalizando...' : 'Finalizar'}
                icon={CheckCircle2}
                className="flex-[0.5]"
                onPress={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}
