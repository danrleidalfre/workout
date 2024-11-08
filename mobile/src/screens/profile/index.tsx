import { Button } from "@/components/button";
import { LogOut } from "@/components/icons/logout";
import { useAuth } from "@/contexts/auth";
import { NavigationRoutes } from "@/routes";
import { User } from "@/storages/user";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

export function Profile() {
  const navigation = useNavigation<NavigationRoutes>();
  const { logout, getUser } = useAuth();
  const [user, setUser] = useState({} as User)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const onLogout = async () => {
    await logout();
    navigation.navigate("signIn");
  };

  return (
    <View className="items-center mt-6 px-6 gap-6">
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">Nome</Text>
        <Text className="text-muted-foreground dark:text-muted">{user.name}</Text>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">E-mail</Text>
        <Text className="text-muted-foreground dark:text-muted">{user.email}</Text>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <ToggleTheme />
        <Button label="Sair" variant="destructive" icon={LogOut} onPress={onLogout} />
      </View>
    </View>
  );
}
