import type { VideoSummary } from "../../types/video";
import { VideoCard } from "../VideoCard/VideoCard";

const SKELETON_COUNT = 8;

type VideoGridProps = {
  videos: VideoSummary[];
  isLoading?: boolean;
  error?: string | null;
  emptyTitle?: string;
  emptyDescription?: string;
  searchQuery?: string;
};

export function VideoGrid({
  videos,
  isLoading = false,
  error = null,
  emptyTitle = "No videos found",
  emptyDescription = "Try a broader search or one of the suggestions above.",
  searchQuery,
}: VideoGridProps) {
  if (error) {
    return (
      <div className="rounded-sm border border-border bg-card/60 p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Something went wrong</p>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-card/60 p-8 text-center">
        <p className="font-display text-3xl text-foreground">{emptyTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} searchQuery={searchQuery} video={video} />
      ))}
    </div>
  );
}

function VideoCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card/50">
      <div className="aspect-video animate-pulse bg-muted" />
      <div className="space-y-3 p-3">
        <div className="h-3 w-2/3 animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}
