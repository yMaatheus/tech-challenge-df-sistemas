import { Skeleton } from "@/components/ui/skeleton";

export function ReviewsListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
    </div>
  );
}
