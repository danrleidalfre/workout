import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ExerciseCardSkeleton() {
  return Array.from({ length: 40 }).map((_, i) => {
    return (
      <Card key={i} className="w-full">
        <CardContent className="flex items-center justify-between p-5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-14" />
        </CardContent>
      </Card>
    )
  })
}
