import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/libs/axios";
import { useAuth } from "@/providers/auth";
import { NavigationRoutes } from "@/routes";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

type SignInForm = {
  email: string;
  password: string;
};

export function SignIn() {
  const { login, setUser } = useAuth();
  const navigation = useNavigation<NavigationRoutes>();

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<SignInForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: SignInForm) => {
    if (!email || !password) return;

    try {
      const { data: token } = await api.post("sessions", { email, password });
      await login(token);

      const { data: user } = await api.get("sessions");
      await setUser(user)

      reset({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-72 gap-2">
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Senha"
            secureTextEntry
          />
        )}
      />
      <Button label={isSubmitting ? "" : "Entrar"} onPress={handleSubmit(onSubmit)} />
      <Text className="text-muted-foreground dark:text-muted mx-auto my-2">Não tem uma conta?</Text>
      <Button label="Cadastrar" variant="secondary" onPress={() => navigation.navigate("signUp")} />
    </View>
  );
}
