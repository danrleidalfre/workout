import { BicepsFlexed } from "@/components/ui/icons/biceps";
import { Moon } from "@/components/ui/icons/moon";
import { Sun } from "@/components/ui/icons/sun";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

export function Header() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className="h-40 items-center justify-between flex-row bg-primary px-10 pt-12">
      <BicepsFlexed size={36} strokeWidth={1} className="text-muted" />
      <Text className="text-xl font-bold text-muted">Treinos</Text>
      <TouchableOpacity
        onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
      >
        {colorScheme === 'light'
          ? <Sun className="text-muted" size={36} strokeWidth={1} />
          : <Moon className="text-muted" size={36} strokeWidth={1} />
        }
      </TouchableOpacity>
    </View>
  )
}