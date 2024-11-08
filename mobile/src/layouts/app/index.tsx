import { BicepsFlexed } from "@/components/icons/biceps";
import { ChevronLeft } from "@/components/icons/left";
import { CircleUserRound } from "@/components/icons/user";
import { AppNavigatorRoutesProps, RoutesProps } from "@/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ScreensRouteProps = RouteProp<RoutesProps>;

type Props = {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  const route = useRoute<ScreensRouteProps>();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const showGoBack = route.name !== "workouts";

  return (
    <View className="flex-1">
      <View className="items-center justify-between flex-row bg-primary pt-16 p-6">
        {showGoBack && (
          <TouchableOpacity className="size-10 items-center justify-center" onPress={() => navigation.goBack()}>
            <ChevronLeft size={28} className="text-muted" />
          </TouchableOpacity>
        )}
        <View className="size-10 items-center justify-center">
          <BicepsFlexed size={36} strokeWidth={1} className="text-muted" />
        </View>
        {!showGoBack && (
          <Text className="text-muted font-bold text-2xl">Treinos</Text>
        )}
        <TouchableOpacity className="size-10 items-center justify-center" onPress={() => navigation.navigate('profile')}>
          <CircleUserRound size={28} strokeWidth={1} className="text-muted" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 bg-background dark:bg-foreground">{children}</View>
    </View>
  );
}
