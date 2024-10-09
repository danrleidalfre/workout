import { Header } from '@/components/header';
import '@/global.css';
import { Home } from '@/screens/home';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <Header />
      <Home />
      <StatusBar />
    </>
  )
}
