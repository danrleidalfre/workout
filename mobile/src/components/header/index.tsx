import { BicepsFlexed } from "@/components/ui/icons/biceps";
import { View } from "react-native";
import { ThemeToggle } from "./theme-toggle";

export function Header() {

  return (
    <View className="h-40 items-center justify-between flex-row bg-primary pt-14 px-8">
      <BicepsFlexed size={48} strokeWidth={1} className="text-muted" />
      <ThemeToggle />
    </View>
  )
}