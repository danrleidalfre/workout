import '@/global.css';
import { AppLayout } from '@/layouts/app';
import { Workouts } from '@/screens/workouts';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <AppLayout />
      <Workouts />
      <StatusBar />
    </>
  )
}
