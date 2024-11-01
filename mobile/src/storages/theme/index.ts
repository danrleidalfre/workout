import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_STORAGE } from "..";

export type Theme = 'light' | 'dark' | 'system'

export async function setThemeStorage(theme: Theme) {
  await AsyncStorage.setItem(THEME_STORAGE, theme);
}

export async function getThemeStorage(): Promise<Theme> {
  return await AsyncStorage.getItem(THEME_STORAGE) as Theme;
}