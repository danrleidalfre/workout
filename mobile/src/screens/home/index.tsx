import { Play } from "@/components/ui/icons/play";
import { Text, View } from "react-native";

export function Home() {
  return (
    <View className="flex-1 bg-foreground dark:bg-background px-10">
      <View className="border border-border rounded-md p-5 flex-row justify-between items-center mt-5">
        <View>
          <Text className="text-muted dark:text-muted-foreground text-lg">Push</Text>
          <Text className="text-muted dark:text-muted-foreground text-sm">Remada, Puxada, Rosca Direta</Text>
        </View>
        <Play className="text-primary" />
      </View>
    </View>
  )
}