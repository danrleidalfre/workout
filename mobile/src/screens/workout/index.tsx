import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { CheckCircle2 } from "@/components/icons/check-circle";
import { Dumbbell } from "@/components/icons/dumbbell";
import { PlusCircle } from "@/components/icons/plus";
import { Timer } from "@/components/icons/timer";
import { Trash2 } from "@/components/icons/trash";
import { Input } from "@/components/input";
import { ProgressDown } from "@/components/progress/down";
import { ProgressUp } from "@/components/progress/up";
import { Select } from "@/components/select";
import { api } from "@/libs/axios";
import { AppNavigatorRoutesProps, RoutesProps } from "@/routes";
import { getWorkoutStorage, removeWorkoutStorage, setWorkoutStorage } from "@/storages/workout";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppState, ScrollView, Text, View } from "react-native";
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
    isNew: boolean
    series: {
      serieId: string;
      load: number;
      reps: number;
      completed: boolean;
    }[];
  }[];
};

type Exercise = {
  id: string
  title: string
}

export function Workout() {
  const { params } = useRoute<WorkoutScreenRouteProps>();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { id } = params;

  const appState = useRef(AppState.currentState);
  const backgroundTimeRef = useRef(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [restTime, setRestTime] = useState(0);

  const [exercises, setExercises] = useState<Exercise[]>([])

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

            const workout = {
              title: data.title,
              start: new Date().toString(),
              end: '',
              exercises: data.exercises.map((exercise) => ({
                ...exercise,
                isNew: false,
                series: exercise.series.map(({ serieId, load, reps, completed }) => ({
                  serieId,
                  load,
                  reps,
                  completed,
                })),
              })),
            }

            reset(workout);

            await setWorkoutStorage(workout)
          } else {
            const workout = await getWorkoutStorage()

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

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data } = await api.get<Exercise[]>('/exercises');
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExercises();
  }, [])

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

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current === "active" && nextAppState.match(/inactive|background/)) {
        backgroundTimeRef.current = Date.now();
      } else if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        const elapsedTime = Math.floor((Date.now() - backgroundTimeRef.current) / 1000);
        setTimeLeft((prevTime) => Math.max(prevTime - elapsedTime, 0));
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

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

  const onSubmit = async (workout: Workout) => {
    try {
      workout.end = new Date().toString();

      await api.post(`/workouts/${id}/completion`, { ...workout });
      await removeWorkoutStorage()

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

    await setWorkoutStorage(workout)
  };

  const handleDiscardWorkout = async () => {
    await removeWorkoutStorage()
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

  const handleAddExercise = () => {
    const newExercise = {
      isNew: true,
      rest: '60',
      note: null,
      series: [
        {
          serieId: '',
          load: 0,
          reps: 0,
          completed: false,
        }
      ],
    };

    reset({
      ...workout,
      exercises: [...workout.exercises, newExercise],
    });
  };

  return (
    <>
      <ProgressUp value={progress} />
      <ScrollView showsVerticalScrollIndicator={false} className="px-6 pt-4">
        {isLoading ? <WorkoutSkeleton /> : (
          <>
            <View className="gap-6">
              {workout.exercises?.map((exercise, exerciseIndex) => (
                <View key={exerciseIndex} className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <View className="flex flex-row items-center gap-3 w-full">
                      <Dumbbell className="text-muted-foreground dark:text-muted -rotate-45" size={28} />
                      {exercise.exerciseId && !exercise.isNew ? (
                        <Text className="text-muted-foreground dark:text-muted font-semibold text-2xl">
                          {exercise.exerciseTitle}
                        </Text>
                      ) : (
                        <Controller
                          name={`exercises.${exerciseIndex}.exerciseId`}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <View className="flex-1">
                              <Select
                                options={exercises}
                                selectedValue={value}
                                onSelect={(selectedValue) => {
                                  const selectedExercise = exercises.find(ex => ex.id === selectedValue);
                                  if (selectedExercise) {
                                    onChange(selectedExercise.id);
                                    const updatedExercises = workout.exercises.map((ex, idx) => {
                                      if (idx === exerciseIndex) {
                                        return {
                                          ...ex,
                                          exerciseId: selectedExercise.id,
                                          exerciseTitle: selectedExercise.title,
                                        };
                                      }
                                      return ex;
                                    });
                                    reset({
                                      ...workout,
                                      exercises: updatedExercises,
                                    });
                                  }
                                }}
                                placeholder="Selecione o exercício"
                                labelKey="title"
                                valueKey="id"
                              />
                            </View>
                          )}
                        />
                      )}
                    </View>
                  </View>

                  {exercise.note && (
                    <Text className="opacity-80 text-xl font-normal text-muted-foreground dark:text-muted text-justify mb-1">
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
                            <Text className="absolute right-4 text-base text-muted-foreground dark:text-muted opacity-50 dark:opacity-80">
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
                            <Text className="absolute right-4 text-base text-muted-foreground dark:text-muted opacity-50 dark:opacity-80">
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
                                if (checked) {
                                  handleSerieComplete(exercise.rest);
                                }
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
              onPress={handleAddExercise}
              labelClasses="text-primary dark:text-primary"
              iconClasses="-rotate-45"
              variant="secondary"
              className="mt-4 mb-2"
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
        <View className="absolute bottom-0 left-0 right-0 bg-secondary dark:bg-secondary-foreground pb-8">
          <ProgressDown value={(timeLeft / restTime) * 100} />
          <View className="flex-row items-center justify-center gap-1 mt-4">
            <Timer size={20} strokeWidth={3} className={(timeLeft / restTime) * 100 < 25 ? 'text-destructive' : 'text-muted-foreground dark:text-muted'} />
            <Text className={`font-bold text-3xl ${(timeLeft / restTime) * 100 < 25 ? 'text-destructive' : 'text-muted-foreground dark:text-muted'}`}>
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}
