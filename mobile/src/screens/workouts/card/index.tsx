import { Button } from "@/components/button";
import { ChevronRight } from "@/components/icons/right";
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
    <View className="px-6 py-4 mt-4 bg-secondary dark:bg-secondary-foreground rounded-md">
      <Text className="text-muted-foreground dark:text-muted text-2xl font-bold">{workout.title}</Text>
      <Text className="text-muted-foreground dark:text-muted text-base font-medium line-clamp-1 mb-2">{workout.exercises}</Text>
      <Button
        label="Iniciar"
        iconAfterLabel
        icon={ChevronRight}
        onPress={() => navigation.navigate('workout', { id: workout.id })}
      />
    </View>
  )
}