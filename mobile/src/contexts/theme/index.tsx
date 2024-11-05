import { useTheme } from "@/hooks/use-theme";
import { Theme } from "@/storages/theme";
import { createContext, ReactNode, useContext } from "react";

interface ThemeContextProps {
  theme: Theme;
  changeTheme: (newTheme: Theme) => void;
}

type ProvidersProps = {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: ProvidersProps) => {
  const { theme, changeTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
