import { Skeleton } from "@/components/skeleton"
import { View } from "react-native"

export function WorkoutCardSkeleton() {
  return (
    Array.from({ length: 6 }).map((_, i) => {
      return (
        <View key={i} className="px-6 py-4 mt-4 bg-neutral-900 dark:bg-neutral-100 rounded-md gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </View>
      )
    })
  )
}