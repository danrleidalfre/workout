import { Button } from "@/components/button";
import { api } from "@/libs/axios";
import { NavigationRoutes } from "@/routes";
import { Workout as WorkoutForm } from "@/screens/workout";
import { getWorkoutStorage, removeWorkoutStorage } from "@/storages/workout";
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
  const navigation = useNavigation<NavigationRoutes>();

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [workoutAlreadyStarted, setWorkoutAlreadyStarted] = useState({} as WorkoutForm)
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const fetchWorkouts = async () => {
        try {
          setIsLoading(true);

          const { data } = await api.get<Workout[]>('/workouts');

          setWorkouts(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchWorkouts();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const getWorkout = async () => {
        const workout = await getWorkoutStorage()
        setWorkoutAlreadyStarted(workout)
      }

      getWorkout();
    }, [workoutAlreadyStarted])
  );

  const handleDiscardWorkout = async () => {
    setWorkoutAlreadyStarted({} as WorkoutForm);
    await removeWorkoutStorage()
  }

  return (
    <View className="flex-1 px-6">
      {workoutAlreadyStarted.title && (
        <View className="px-6 py-4 mt-2 rounded-md">
          <View className="flex-row justify-between items-center">
            <Text className="text-muted-foreground dark:text-muted text-2xl font-bold">{workoutAlreadyStarted.title}</Text>
            <Text className="text-muted-foreground dark:text-muted text-base font-medium">em andamento</Text>
          </View>
          <View className="flex-row gap-4 mt-2">
            <Button
              label="Descartar"
              variant="destructive"
              className="flex-[0.5]"
              onPress={handleDiscardWorkout}
            />
            <Button
              iconAfterLabel
              label="Continuar"
              className="flex-[0.5]"
              onPress={() => navigation.navigate('workout', { id: '' })}
            />
          </View>
        </View>
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
  )
}