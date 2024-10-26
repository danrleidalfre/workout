import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { CheckCircle2 } from "@/components/icons/check-circle";
import { Clock } from "@/components/icons/clock";
import { Dumbbell } from "@/components/icons/dumbbell";
import { Trash2 } from "@/components/icons/trash";
import { Input } from "@/components/input";
import { Progress } from "@/components/progress";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { api } from "@/lib/axios";
import { AppNavigatorRoutesProps, RoutesProps } from "@/routes";
import { createWorkout, deleteWorkout, getWorkout } from "@/storage/workout";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { WorkoutSkeleton } from "./skeleton";

type WorkoutScreenRouteProps = RouteProp<RoutesProps, 'workout'>;

export type Workout = {
  title: string;
  start: string;
  end: string;
  exercises: {
    exerciseId: string;
    exerciseTitle: string;
    rest: string;
    note: string | null
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
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const { control, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm({
    defaultValues: {} as Workout,
  });

  useFocusEffect(
    useCallback(() => {
      const fetchWorkout = async () => {
        try {
          setIsLoading(true);

          if (id) {
            const { data } = await api.get<Workout>(`/workouts/${id}`);

            onSetTitle(data.title);

            const workout = {
              title: data.title,
              start: new Date().toString(),
              end: '',
              exercises: data.exercises.map((exercise) => ({
                ...exercise,
                series: exercise.series.map(({ serieId, load, reps, completed }) => ({
                  serieId,
                  load,
                  reps,
                  completed,
                })),
              })),
            }

            reset(workout);

            await createWorkout(workout)
          } else {
            const workout = await getWorkout()

            onSetTitle(workout.title)

            reset(workout)
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchWorkout();
    }, [id])
  );

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

  const handleSerieComplete = async (exerciseIndex: number, restTime: string) => {
    setIsCountdownActive(true);
    setCurrentExerciseIndex(exerciseIndex);
    setTimeLeft(parseInt(restTime, 10));
    await createWorkout(workout)
  };

  const handleCountdownComplete = () => {
    setIsCountdownActive(false);
    setCurrentExerciseIndex(null);
  };

  useEffect(() => {
    if (!isCountdownActive || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleCountdownComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCountdownActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const handleDiscardWorkout = async () => {
    await deleteWorkout()
    navigation.navigate('workouts')
  }

  return (
    <>
      <Header />
      <Progress value={progress} />
      <ScrollView className="flex-1 bg-foreground dark:bg-background px-4 pt-4">
        {isLoading ? <WorkoutSkeleton /> : (
          <>
            <View className="gap-6">
              {workout.exercises?.map((exercise, exerciseIndex) => (
                <View key={exercise.exerciseId} className="gap-3">
                  <View className="flex-row justify-between items-center">
                    <View className="flex flex-row items-center gap-3">
                      <Dumbbell className="text-primary dark:text-muted-foreground -rotate-45" size={28} />
                      <Text className="text-primary dark:text-muted-foreground font-semibold text-2xl">
                        {exercise.exerciseTitle}
                      </Text>
                    </View>
                    {currentExerciseIndex === exerciseIndex && timeLeft > 0 && (
                      <View className="items-center flex flex-row gap-1">
                        <Text className={`font-semibold text-2xl ${timeLeft <= 10 ? 'text-destructive' : 'text-muted dark:text-muted-foreground'}`}>
                          {formatTime(timeLeft)}
                        </Text>
                        <Clock size={16} className={`${timeLeft <= 10 ? 'text-destructive' : 'text-muted dark:text-muted-foreground'}`} />
                      </View>
                    )}
                  </View>

                  {exercise.note && (
                    <Text className="opacity-80 text-xl font-normal text-muted dark:text-muted-foreground text-justify">
                      {exercise.note}
                    </Text>
                  )}

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
                              keyboardType="numeric"
                              className="w-full"
                            />
                            <Text className="absolute right-4 text-base text-muted dark:text-muted-foreground opacity-50 dark:opacity-80">
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
                              keyboardType="numeric"
                              className="w-full"
                            />
                            <Text className="absolute right-4 text-base text-muted dark:text-muted-foreground opacity-50 dark:opacity-80">
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
                onPress={handleDiscardWorkout}
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
