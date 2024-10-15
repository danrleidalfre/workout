import { Skeleton } from "@/components/skeleton";
import { View } from "react-native";

export function WorkoutSkeleton() {
  return (
    <View className="gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} className="gap-3">
          <View className="flex-row items-center gap-3">
            <Skeleton className="size-10" />
            <Skeleton className="h-7 w-52" />
          </View>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} className="flex-row gap-3">
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