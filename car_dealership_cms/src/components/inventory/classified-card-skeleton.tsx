import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ClassifiedCardSkeleton = () => {
  return (
    <Card className="border border-muted">
      <div className="relative w-full">
        <Skeleton className="w-full h-full aspect-3/2" />
      </div>

      <CardContent className="p-4 h-fit">
        <div className="space-y-4 h-[180px]">
          <div className="space-y-2">
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4 mr-8" />
          </div>
          <div className="space-y-2">
            <div className="space-x-2 flex justify-around">
              <Skeleton className="w-1/12 h-4" />
              <Skeleton className="w-1/12 h-4" />
              <Skeleton className="w-1/12 h-4" />
              <Skeleton className="w-1/12 h-4" />
            </div>
            <div className="space-x-2 flex justify-around">
              <Skeleton className="w-1/4 h-4" />
              <Skeleton className="w-1/4 h-4" />
              <Skeleton className="w-1/4 h-4" />
              <Skeleton className="w-1/4 h-4" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        </div>
        <div className="flex relative gap-x-2 justify-between">
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-1/2 h-10" />
        </div>
      </CardContent>
    </Card>
  );
};
