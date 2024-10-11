import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_STORAGE } from "..";

export async function updateTheme(theme: 'light' | 'dark') {
  await AsyncStorage.setItem(THEME_STORAGE, theme);
}

export async function getTheme(): Promise<'light' | 'dark' | null> {
  const theme = await AsyncStorage.getItem(THEME_STORAGE);
  return theme === 'light' || theme === 'dark' ? theme : null;
}
