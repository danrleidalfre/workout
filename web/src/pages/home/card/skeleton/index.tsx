import { Skeleton } from '@/components/ui/skeleton'

export function HomeCardSkeleton() {
  return Array.from({ length: 3 }).map((_, i) => (
    <div key={i} className="grid gap-1">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex justify-between items-center gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  ))
}
