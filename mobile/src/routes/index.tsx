import { AppLayout } from "@/layouts/app";
import { AuthLayout } from "@/layouts/auth";
import { Profile } from "@/screens/profile";
import { Workout } from "@/screens/workout";
import { Workouts } from "@/screens/workouts";
import { useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RoutesProps = {
  login: undefined;
  workouts: undefined;
  workout: { id: string };
  profile: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<RoutesProps>;

const { Screen, Navigator } = createNativeStackNavigator<RoutesProps>();

function AppRoutes() {
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
  );
}

function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={AuthLayout} />
    </Navigator>
  );
}

export function Routes() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
