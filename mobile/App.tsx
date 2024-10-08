import '@/global.css';
import { Home } from '@/screens/home';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

export default function App() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      <Home />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  )
}
