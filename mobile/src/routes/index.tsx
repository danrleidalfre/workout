import { useAuth } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppRoutes } from "./app";
import { AuthRoutes } from "./auth";

export type RoutesProps = {
  login: undefined;
  workouts: undefined;
  workout: { id: string };
  profile: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<RoutesProps>;

export function Routes() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {isSignedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
