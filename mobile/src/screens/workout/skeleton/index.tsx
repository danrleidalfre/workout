import { Skeleton } from "@/components/skeleton";
import { View } from "react-native";

export function WorkoutSkeleton() {
  return (
    <View className="gap-6">
      <View className="bg-secondary dark:bg-secondary-foreground p-3 flex-row gap-2">
        <View className="flex-row gap-2 items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </View>
        <Skeleton className="h-10 flex-1" />
      </View>
      <View className="px-6 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} className="gap-3">
            <Skeleton className="h-10 w-80" />
            {Array.from({ length: 3 }).map((_, i) => (
              <View key={i} className="flex-row gap-3">
                <Skeleton className="h-10 w-full flex-[0.45]" />
                <Skeleton className="h-10 w-full flex-[0.45]" />
                <Skeleton className="size-10 flex-[0.1]" />
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}