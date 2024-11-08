import { AppLayout } from "@/layouts/app";
import { Profile } from "@/screens/profile";
import { Workout } from "@/screens/workout";
import { Workouts } from "@/screens/workouts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export function AppRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="workouts">
        {() => (
          <AppLayout>
            <Workouts />
          </AppLayout>
        )}
      </Screen>
      <Screen name="workout">
        {() => (
          <AppLayout>
            <Workout />
          </AppLayout>
        )}
      </Screen>
      <Screen name="profile">
        {() => (
          <AppLayout>
            <Profile />
          </AppLayout>
        )}
      </Screen>
    </Navigator>
  )
}