import { Skeleton } from '@/components/ui/skeleton'

export function HomeCardSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="border-b pb-2 flex items-center justify-between">
      <div className="grid gap-1">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-28" />
      </div>
      <div className="flex gap-1">
        <Skeleton className="size-4" />
        <Skeleton className="size-4" />
        <Skeleton className="size-4" />
        <Skeleton className="size-4" />
      </div>
    </div>
  ))
}
