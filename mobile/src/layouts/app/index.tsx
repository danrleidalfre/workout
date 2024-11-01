import { BicepsFlexed } from "@/components/icons/biceps";
import { ChevronLeft } from "@/components/icons/left";
import { AppNavigatorRoutesProps, RoutesProps } from "@/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ReactNode } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ScreensRouteProps = RouteProp<RoutesProps>;

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const route = useRoute<ScreensRouteProps>();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const showGoBack = route.name !== "workouts";

  return (
    <View className="flex-1">
      <View className="items-center justify-between flex-row bg-primary pt-16 p-6">
        {showGoBack && (
          <TouchableOpacity className="size-10 items-center justify-center" onPress={() => navigation.goBack()}>
            <ChevronLeft size={32} className="text-muted" />
          </TouchableOpacity>
        )}
        <View className="size-10 items-center justify-center">
          <BicepsFlexed size={36} strokeWidth={1} className="text-muted" />
        </View>
        {!showGoBack && (
          <Text className="text-muted font-bold text-2xl">Treinos</Text>
        )}
        <TouchableOpacity className="size-10 items-center justify-center" onPress={() => navigation.navigate('profile')}>
          <Image src="https://github.com/danrleidalfre.png" className="size-full rounded-full" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 bg-background dark:bg-foreground">{children}</View>
    </View>
  );
}
