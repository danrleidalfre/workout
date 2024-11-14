import { Providers } from '@/providers';
import { Routes } from '@/routes';
import { StatusBar } from 'expo-status-bar';
import "./global.css";

export default function App() {
  return (
    <>
      <StatusBar />
      <Providers>
        <Routes />
      </Providers>
    </>
  );
}