import { BicepsFlexed } from "@/components/ui/icons/biceps";
import { View } from "react-native";
import { ThemeToggle } from "./theme-toggle";

export function Header() {

  return (
    <View className="h-40 items-center justify-between flex-row bg-primary px-10 pt-12">
      <BicepsFlexed size={36} strokeWidth={1} className="text-muted" />
      <ThemeToggle />
    </View>
  )
}