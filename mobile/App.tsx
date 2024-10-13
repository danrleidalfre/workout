import { HeaderTitleContextProvider } from '@/contexts/header-title';
import '@/global.css';
import { Routes } from '@/routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar />
      <HeaderTitleContextProvider>
        <Routes />
      </HeaderTitleContextProvider>
    </>
  )
}
