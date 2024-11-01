import { Skeleton } from "@/components/skeleton";
import { View } from "react-native";

export function WorkoutSkeleton() {
  return (
    <View className="gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} className="gap-3">
          <Skeleton className="h-10 w-52" />
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
  )
}