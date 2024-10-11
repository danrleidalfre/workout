import { Moon } from "@/components/ui/icons/moon";
import { Sun } from "@/components/ui/icons/sun";
import { getTheme, updateTheme } from "@/storage/theme";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const getThemeStorage = async () => {
      const theme = await getTheme();

      if (theme && theme !== colorScheme) {
        setColorScheme(theme);
      }
    };

    getThemeStorage();
  }, [colorScheme]);


  const handleSetColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newColorScheme);
    updateTheme(newColorScheme);
  }


  return (
    <TouchableOpacity
      onPress={handleSetColorScheme}
    >
      {colorScheme === 'light'
        ? <Sun className="text-muted" size={28} strokeWidth={1} />
        : <Moon className="text-muted" size={28} strokeWidth={1} />
      }
    </TouchableOpacity>
  )
}