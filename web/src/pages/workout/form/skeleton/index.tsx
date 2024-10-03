import { Skeleton } from '@/components/ui/skeleton'

export function WorkoutFormSkeleton() {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-[1fr_auto] h-9 gap-4 mb-2">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-28" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid gap-2">
          {Array.from({ length: 4 }).map((_, j) => (
            <div key={j} className="grid grid-cols-[auto_1fr_auto] h-9 gap-2">
              <Skeleton className="size-9" />
              <Skeleton className="h-full w-full" />
              <Skeleton className="size-9" />
            </div>
          ))}
          <Skeleton className="h-9 w-full mb-2" />
        </div>
      ))}
    </div>
  )
}
