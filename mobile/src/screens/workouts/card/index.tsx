import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Text, View } from "react-native";
import { Workout } from "..";

type Props = {
  workout: Workout
}

export function WorkoutCard({ workout }: Props) {
  function handleNavigateToWorkout(id: string) {
    console.log(id);
  }

  return (
    <View className="border border-border dark:border-card-foreground p-4 justify-between mt-4 rounded-md gap-2">
      <View className="flex-row justify-between w-full">
        <Text className="text-muted dark:text-muted-foreground text-xl font-bold">{workout.title}</Text>
        <View className="flex-row gap-1">
          {workout.groups.map(group => (
            <Badge key={group} label={group} variant="secondary" />
          ))}
        </View>
      </View>
      <Text className="text-muted dark:text-muted-foreground text-base line-clamp-1">{workout.exercises}</Text>
      <Button
        label="Iniciar"
        onPress={() => handleNavigateToWorkout(workout.id)}
      />
    </View>
  )
}