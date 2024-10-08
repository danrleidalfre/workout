import { Moon } from "@/components/ui/icons/moon";
import { Sun } from "@/components/ui/icons/sun";
import { useColorScheme } from "nativewind";
import { TouchableOpacity } from "react-native";

export function Home() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      className="flex-1 justify-center items-center dark:bg-neutral-800 bg-neutral-200"
      onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
    >
      {colorScheme === 'light' ? <Sun className="text-primary" /> : <Moon className="text-primary" />}
    </TouchableOpacity>

  )
}