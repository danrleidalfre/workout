import { BicepsFlexed } from "@/components/icons/biceps";
import { ChevronLeft } from "@/components/icons/chevron-left";
import { useHeaderTitle } from "@/hooks/useHeaderTitle";
import { RoutesProps } from "@/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

type ScreensRouteProps = RouteProp<RoutesProps>;

export function Header() {
  const route = useRoute<ScreensRouteProps>();
  const navigation = useNavigation();
  const { title, onSetTitle } = useHeaderTitle()

  const showTitle = route.name !== "workouts"

  function handleGoBack() {
    navigation.goBack()
    onSetTitle('')
  }

  return (
    <View className="h-40 items-center justify-between flex-row bg-primary pt-14 px-8">
      {showTitle && (
        <TouchableOpacity className="size-10 items-center justify-center" onPress={handleGoBack}>
          <ChevronLeft
            size={28}
            className="text-muted"
          />
        </TouchableOpacity>
      )}
      <View className="items-center">
        <BicepsFlexed size={40} strokeWidth={1} className="text-muted" />
        {showTitle && (
          <Text className="text-muted font-bold text-2xl">{title || 'Carregando...'}</Text>
        )}
      </View>
      {!showTitle && (
        <Text className="text-muted font-bold text-2xl">Treinos</Text>
      )}
      <ToggleTheme />
    </View>
  );
}
