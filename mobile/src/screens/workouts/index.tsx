import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { AppNavigatorRoutesProps } from "@/routes";
import { Workout as WorkoutForm } from "@/screens/workout";
import { deleteWorkout, getWorkout } from "@/storage/workout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
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
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [workoutAlreadyStarted, setWorkoutAlreadyStarted] = useState({} as WorkoutForm)
  const [isLoading, setIsLoading] = useState(false)

  async function fetchWorkouts() {
    try {
      setIsLoading(true)

      const { data } = await api.get<Workout[]>('/workouts')

      setWorkouts(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, [])

  useFocusEffect(
    useCallback(() => {
      const getWorkoutStorage = async () => {
        const workout = await getWorkout()
        setWorkoutAlreadyStarted(workout)
      }

      getWorkoutStorage();
    }, [workoutAlreadyStarted])
  );

  const handleDiscardWorkout = async () => {
    await deleteWorkout()
  }

  return (
    <>
      <Header />
      <View className="flex-1 bg-foreground dark:bg-background px-4">
        {workoutAlreadyStarted.title && (
          <View className="flex-col items-center px-6 py-4 mt-2">
            <Text className="text-muted dark:text-muted-foreground text-xl font-medium">{workoutAlreadyStarted.title} em andamento</Text>
            <View className="flex-row gap-4 mt-2">
              <Button
                label="Descartar"
                variant="destructive"
                className="flex-[0.5]"
                onPress={handleDiscardWorkout}
              />
              <Button
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
    </>
  )
}