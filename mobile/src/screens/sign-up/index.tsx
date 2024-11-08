import { Button } from "@/components/button";
import { ChevronLeft } from "@/components/icons/left";
import { Input } from "@/components/input";
import { useAuth } from "@/contexts/auth";
import { api } from "@/libs/axios";
import { AppNavigatorRoutesProps } from "@/routes";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

type SignUpForm = {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

export function SignUp() {
  const { login, setUser } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<SignUpForm>({
    defaultValues: { name: "", email: "", password: "", passwordConfirm: "" },
  });

  const onSubmit = async ({ name, email, password, passwordConfirm }: SignUpForm) => {
    if (!name || !email || !password || !passwordConfirm) return;

    if (password !== passwordConfirm) return

    try {
      await api.post("users", { name, email, password });

      const { data: token } = await api.post("sessions", { email, password });
      await login(token);

      const { data: user } = await api.get("sessions");
      await setUser(user)

      reset({ name: "", email: "", password: "", passwordConfirm: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="w-72 gap-2">
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Nome"
          />
        )}
      />
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
      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            placeholder="Confirmar a senha"
            secureTextEntry
          />
        )}
      />
      <View className="flex-row justify-between">
        <Button label="Voltar" variant="secondary" className="w-28" icon={ChevronLeft} onPress={() => navigation.navigate("signIn")} />
        <Button label={isSubmitting ? "" : "Cadastrar"} className="w-28" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
