import { AppLayout } from "@/layouts/app";
import { Profile } from "@/screens/profile";
import { Workout } from "@/screens/workout";
import { Workouts } from "@/screens/workouts";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RoutesProps = {
  workouts: undefined;
  workout: { id: string };
  profile: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<RoutesProps>;

const { Screen, Navigator } = createNativeStackNavigator<RoutesProps>();

export function Routes() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
