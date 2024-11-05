import { Button } from "@/components/button";
import { LogOut } from "@/components/icons/logout";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

export function Profile() {
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <View className="items-center mt-6 px-6 gap-6">
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">Nome</Text>
        <Text className="text-muted-foreground dark:text-muted">{user?.fullName}</Text>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">E-mail</Text>
        <Text className="text-muted-foreground dark:text-muted">{user?.emailAddresses[0].emailAddress}</Text>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">Tema do app</Text>
        <ToggleTheme />
      </View>
      <Button label="Sair" variant="destructive" className="w-full" iconAfterLabel icon={LogOut} onPress={() => signOut()} />
    </View>
  )
}