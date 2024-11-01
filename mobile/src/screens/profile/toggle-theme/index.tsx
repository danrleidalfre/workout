import { Check } from "@/components/icons/check";
import { useThemeContext } from "@/contexts/theme";
import { cn } from "@/libs/utils";
import { Text, TouchableOpacity, View } from "react-native";

export function ToggleTheme() {
  const { theme, changeTheme } = useThemeContext();

  return (
    <View className="flex-row">
      <TouchableOpacity className={cn(
        'h-10 px-4 rounded-tl-full rounded-bl-full flex-row items-center justify-center gap-1',
        'bg-secondary dark:bg-secondary-foreground',
        { 'bg-primary': theme === 'light' }
      )} onPress={() => changeTheme('light')}>
        {theme === 'light' && <Check size={16} className="text-muted" />}
        <Text className={cn(
          'text-muted-foreground dark:text-muted text-base font-medium',
          { 'text-muted': theme === 'light' }
        )}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity className={cn(
        'h-10 px-4 flex-row items-center justify-center gap-1',
        'bg-secondary dark:bg-secondary-foreground',
        { 'bg-primary dark:bg-primary': theme === 'dark' }
      )} onPress={() => changeTheme('dark')}>
        {theme === 'dark' && <Check size={16} className="text-muted" />}
        <Text className="text-muted-foreground dark:text-muted text-base font-medium">Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity className={cn(
        'h-10 px-4 rounded-tr-full rounded-br-full flex-row items-center justify-center gap-1',
        'bg-secondary dark:bg-secondary-foreground',
        { 'bg-primary dark:bg-primary': theme === 'system' }
      )} onPress={() => changeTheme('system')}>
        {theme === 'system' && <Check size={16} className="text-muted" />}
        <Text className={cn(
          'text-muted-foreground dark:text-muted text-base font-medium',
          { 'text-muted': theme === 'system' }
        )}>Auto</Text>
      </TouchableOpacity>
    </View>
  );
}
