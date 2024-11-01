import { View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

export function Profile() {
  return (
    <View className="items-center mt-4">
      <ToggleTheme />
    </View>
  ) 
}