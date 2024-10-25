import { Skeleton } from "@/components/skeleton"
import { View } from "react-native"

export function WorkoutCardSkeleton() {
  return (
    Array.from({ length: 6 }).map((_, i) => {
      return (
        <View key={i} className="py-2 px-4 mt-4 gap-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-10 w-full" />
        </View>
      )
    })
  )
}