import '@/global.css';
import { AppLayout } from '@/layouts/app';
import { Workouts } from '@/screens/workouts';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function App() {
  return (
    <>
      <AppLayout />
      <View className="flex-1 bg-foreground dark:bg-background px-8">
        <Workouts />
        <StatusBar />
      </View>
    </>
  )
}
