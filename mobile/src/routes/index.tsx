import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppRoutes } from "./app";

export type RoutesProps = {
  login: undefined;
  workouts: undefined;
  workout: { id: string };
  profile: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<RoutesProps>;

export function Routes() {
  return (
    <NavigationContainer>
      {<AppRoutes />}
    </NavigationContainer>
  );
}
