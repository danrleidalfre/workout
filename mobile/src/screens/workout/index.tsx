import { AppRoutes } from "@/routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

type WorkoutScreenRouteProp = RouteProp<AppRoutes, 'workout'>;

export function Workout() {
  const { params } = useRoute<WorkoutScreenRouteProp>();
  const { id } = params;

  return (
    <View className="flex-1 bg-foreground dark:bg-background px-8">
      <Text className="text-muted dark:text-muted-foreground">{id}</Text>
    </View>
  )
}