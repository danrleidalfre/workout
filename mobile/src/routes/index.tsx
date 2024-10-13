import { Workout } from "@/screens/workout";
import { Workouts } from "@/screens/workouts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RoutesProps = {
  workouts: undefined
  workout: { id: string }
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<RoutesProps>

const { Screen, Navigator } = createNativeStackNavigator<RoutesProps>()

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