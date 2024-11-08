import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "..";

export type User = {
  name: string
  email: string
}

export async function setUserStorage(user: User) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getUserStorage(): Promise<User> {
  const storage = await AsyncStorage.getItem(USER_STORAGE)
  return storage ? JSON.parse(storage) : {}
}

export async function removeUserStorage(): Promise<void> {
  await AsyncStorage.removeItem(USER_STORAGE)
}