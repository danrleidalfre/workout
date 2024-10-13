import '@/global.css';
import { AppLayout } from '@/layouts/app';
import { Routes } from '@/routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar />
      <AppLayout />
      <Routes />
    </>
  )
}
