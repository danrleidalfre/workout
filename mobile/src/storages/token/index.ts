import * as SecureStore from 'expo-secure-store';

export const token = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key)
    } catch (error) {
      console.error(error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}