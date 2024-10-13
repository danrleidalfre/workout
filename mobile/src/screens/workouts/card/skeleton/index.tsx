import { Skeleton } from "@/components/skeleton"
import { View } from "react-native"

export function WorkoutCardSkeleton() {
  return (
    Array.from({ length: 6 }).map((_, i) => {
      return (
        <View key={i} className="border-0.25 border-card dark:border-card-foreground p-4 justify-between mt-4 rounded-md gap-2">
          <View className="flex-row justify-between w-full">
            <Skeleton className="h-7 w-24" />
            <View className="flex-row gap-1">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-14" />
              <Skeleton className="h-7 w-18" />
            </View>
          </View>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-10 w-full" />
        </View>
      )
    })
  )
}