import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE } from '..';

export async function setTokenStorage(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE, token)
}

export async function getTokenStorage(): Promise<string | null> {
  return await AsyncStorage.getItem(TOKEN_STORAGE)
}

export async function removeTokenStorage(): Promise<void> {
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}