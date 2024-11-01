import { Workout } from "@/screens/workout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WORKOUT_STORAGE } from "..";

export async function setWorkoutStorage(workout: Workout) {
  await AsyncStorage.setItem(WORKOUT_STORAGE, JSON.stringify(workout))
}

export async function getWorkoutStorage(): Promise<Workout> {
  const storage = await AsyncStorage.getItem(WORKOUT_STORAGE)
  return storage ? JSON.parse(storage) : {}
}

export async function removeWorkoutStorage(): Promise<void> {
  await AsyncStorage.removeItem(WORKOUT_STORAGE)
}