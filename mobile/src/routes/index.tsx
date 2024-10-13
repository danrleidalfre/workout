import { Workout } from "@/screens/workout";
import { Workouts } from "@/screens/workouts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AppRoutes = {
  workouts: undefined
  workout: { id: string }
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Screen, Navigator } = createNativeStackNavigator<AppRoutes>()

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name='workouts'
          component={Workouts}
        />
        <Screen
          name='workout'
          component={Workout}
        />
      </Navigator>
    </NavigationContainer>
  )
}