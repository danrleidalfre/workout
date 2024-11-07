import { Text, View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

export function Profile() {
  return (
    <View className="items-center mt-6 px-6 gap-6">
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">Nome</Text>
        <Text className="text-muted-foreground dark:text-muted">Danrlei Dal Fré</Text>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">E-mail</Text>
        <Text className="text-muted-foreground dark:text-muted">danrleidalfre@gmail.com</Text>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">Tema</Text>
        <ToggleTheme />
      </View>
    </View>
  )
}