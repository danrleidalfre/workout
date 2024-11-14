import { getThemeStorage, setThemeStorage, Theme } from "@/storages/theme";
import { useColorScheme } from "nativewind";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
}

type ProvidersProps = {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: ProvidersProps) => {
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

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
