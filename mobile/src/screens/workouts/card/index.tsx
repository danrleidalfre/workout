import { Button } from "@/components/button";
import { ChevronRight } from "@/components/icons/chevron-right";
import { AppNavigatorRoutesProps } from "@/routes";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Workout } from "..";

type Props = {
  workout: Workout
}

export function WorkoutCard({ workout }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  return (
    <View className="py-2 px-4 mt-4">
      <Text className="text-muted dark:text-muted-foreground text-2xl font-bold">{workout.title}</Text>
      <Text className="text-muted dark:text-muted-foreground text-base font-medium line-clamp-1 mt-1 mb-2">{workout.exercises}</Text>
      <Button
        label="Iniciar"
        iconAfterLabel
        icon={ChevronRight}
        onPress={() => navigation.navigate('workout', { id: workout.id })}
      />
    </View>
  )
}