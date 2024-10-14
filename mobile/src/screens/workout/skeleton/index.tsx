import { Skeleton } from "@/components/skeleton";
import { View } from "react-native";

export function WorkoutSkeleton() {
  return (
    <View className="gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} className="gap-2">
          <Skeleton className="h-7 w-40" />
          <View className="flex-row gap-2">
            <Skeleton className="h-6 w-full flex-[0.1]" />
            <Skeleton className="h-6 flex-[0.4]" />
            <Skeleton className="h-6 flex-[0.4]" />
            <Skeleton className="h-6 w-full flex-[0.1]" />
          </View>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} className="flex-row gap-2">
              <Skeleton className="size-10 flex-[0.1]" />
              <Skeleton className="h-10 w-full flex-[0.4]" />
              <Skeleton className="h-10 w-full flex-[0.4]" />
              <Skeleton className="size-10 flex-[0.1]" />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}