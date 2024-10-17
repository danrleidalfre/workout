import { Badge } from "@/components/badge";
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
    <View className="border-0.25 border-card dark:border-card-foreground p-4 justify-between mt-4 rounded-md gap-2">
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-muted dark:text-muted-foreground text-xl font-bold">{workout.title}</Text>
        <View className="flex-row gap-1">
          {workout.groups.map(group => (
            <Badge key={group} label={group} variant="outline" />
          ))}
        </View>
      </View>
      <Text className="text-muted dark:text-muted-foreground text-base line-clamp-1">{workout.exercises}</Text>
      <Button
        label="Iniciar"
        iconAfterLabel
        icon={ChevronRight}
        onPress={() => navigation.navigate('workout', { id: workout.id })}
      />
    </View>
  )
}