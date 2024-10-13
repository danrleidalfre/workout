import { BicepsFlexed } from "@/components/icons/biceps";
import { ChevronLeft } from "@/components/icons/chevron-left";
import { RoutesProps } from "@/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { ToggleTheme } from "./toggle-theme";

type ScreensRouteProps = RouteProp<RoutesProps>;

export function Header() {
  const route = useRoute<ScreensRouteProps>();
  const navigation = useNavigation();

  return (
    <View className="h-40 items-center justify-between flex-row bg-primary pt-14 px-8">
      {route.name !== "workouts" && (
        <ChevronLeft
          size={28}
          className="text-muted"
          onPress={() => navigation.goBack()}
        />
      )}
      <BicepsFlexed size={40} strokeWidth={1} className="text-muted" />
      <ToggleTheme />
    </View>
  );
}
