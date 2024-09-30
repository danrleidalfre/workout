import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function WorkoutCardSkeleton() {
  return Array.from({ length: 40 }).map((_, i) => {
    return (
      <Card key={i} className="w-full">
        <CardContent className="grid p-5">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24" />
            <div className="flex gap-1">
              <Skeleton className="h-6 w-14" />
              <Skeleton className="h-6 w-14" />
              <Skeleton className="h-6 w-14" />
            </div>
          </div>
          <Skeleton className="h-5 w-72 mt-1" />
        </CardContent>
      </Card>
    )
  })
}
