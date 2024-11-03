import { Text, View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

export function Profile() {
  return (
    <View className="items-center mt-4 px-6">
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted-foreground dark:text-muted">Tema do app</Text>
        <ToggleTheme />
      </View>
    </View>
  )
}