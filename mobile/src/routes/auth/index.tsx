import { AuthLayout } from "@/layouts/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RoutesProps } from "..";

export function AuthRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator<RoutesProps>();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={AuthLayout} />
    </Navigator>
  );
}