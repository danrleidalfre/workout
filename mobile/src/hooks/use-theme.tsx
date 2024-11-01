import { getThemeStorage, setThemeStorage, Theme } from "@/storages/theme";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";

export function useTheme() {
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const initializeTheme = async () => {
      const storedTheme = await getThemeStorage();
      const defaultTheme = storedTheme || 'system';

      setTheme(defaultTheme);
      setColorScheme(defaultTheme);
      if (!storedTheme) await setThemeStorage('system');
    };

    initializeTheme();
  }, []);

  const changeTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    setColorScheme(newTheme);
    await setThemeStorage(newTheme);
  };

  return { theme, changeTheme };
}
