import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { CheckCircle2 } from "@/components/icons/check-circle";
import { Clock } from "@/components/icons/clock";
import { Dumbbell } from "@/components/icons/dumbbell";
import { PlusCircle } from "@/components/icons/plus";
import { Trash2 } from "@/components/icons/trash";
import { Input } from "@/components/input";
import { Progress } from "@/components/progress";
import { ProgressDown } from "@/components/progress-down";
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
  const [timeLeft, setTimeLeft] = useState(0);
  const [restTime, setRestTime] = useState(0);

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
      await deleteWorkout()

      navigation.navigate('workouts');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSerieComplete = async (restTime: string) => {
    if (calculateProgress() === 100) {
      return
    }

    const time = parseInt(restTime, 10)

    setRestTime(time)
    setTimeLeft(time);
    setIsCountdownActive(true);

    await createWorkout(workout)
  };

  useEffect(() => {
    if (!isCountdownActive || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCountdownActive(false);
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

  const handleAddSerie = (exerciseIndex: number) => {
    const newSerie = {
      serieId: '',
      load: 0,
      reps: 0,
      completed: false,
    };

    const updatedExercises = workout.exercises.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return {
          ...exercise,
          series: [...exercise.series, newSerie],
        };
      }
      return exercise;
    });

    reset({
      ...workout,
      exercises: updatedExercises,
    });
  };

  return (
    <>
      <Header />
      <Progress value={progress} />
      <ScrollView className="flex-1 bg-foreground dark:bg-background px-6 pt-4">
        {isLoading ? <WorkoutSkeleton /> : (
          <>
            <View className="gap-6">
              {workout.exercises?.map((exercise, exerciseIndex) => (
                <View key={exercise.exerciseId} className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <View className="flex flex-row items-center gap-3">
                      <Dumbbell className="text-muted dark:text-muted-foreground" size={28} />
                      <Text className="text-muted dark:text-muted-foreground font-semibold text-2xl">
                        {exercise.exerciseTitle}
                      </Text>
                    </View>
                  </View>

                  {exercise.note && (
                    <Text className="opacity-80 text-xl font-normal text-muted dark:text-muted-foreground text-justify mb-1">
                      {exercise.note}
                    </Text>
                  )}

                  {exercise.series.map((_, serieIndex) => (
                    <View key={serieIndex} className="flex-row gap-2">
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
                        render={({ field: { onChange, value } }) => {
                          const { load, reps } = workout.exercises[exerciseIndex].series[serieIndex];

                          return (
                            <Checkbox
                              disabled={Number(load) <= 0 || Number(reps) <= 0}
                              checked={value}
                              onChange={(checked) => {
                                onChange(checked);
                                handleSerieComplete(exercise.rest);
                              }}
                              className="flex-[0.1]"
                            />)
                        }}
                      />
                    </View>
                  ))}

                  <Button
                    label="Adicionar série"
                    variant="secondary"
                    icon={PlusCircle}
                    onPress={() => handleAddSerie(exerciseIndex)}
                  />
                </View>
              ))}
            </View>

            <Button
              label="Adicionar exercício"
              icon={Dumbbell}
              className="my-6"
            />

            <View className="flex-row gap-4 mb-96">
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
      {timeLeft > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-secondary-foreground dark:bg-secondary pb-8">
          <ProgressDown value={(timeLeft / restTime) * 100} />
          <View className="flex-row items-center justify-center gap-1 mt-4">
            <Clock size={20} strokeWidth={3} className={(timeLeft / restTime) * 100 < 25 ? 'text-destructive' : 'text-muted dark:text-muted-foreground'} />
            <Text className={`font-bold text-3xl ${(timeLeft / restTime) * 100 < 25 ? 'text-destructive' : 'text-muted dark:text-muted-foreground'}`}>
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
