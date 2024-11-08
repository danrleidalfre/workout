import { AuthLayout } from "@/layouts/auth";
import { SignIn } from "@/screens/sign-in";
import { SignUp } from "@/screens/sign-up";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export function AuthRoutes() {
  const { Screen, Navigator } = createNativeStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn">
        {() => (
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        )}
      </Screen>
      <Screen name="signUp">
        {() => (
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        )}
      </Screen>
    </Navigator>
  )
}