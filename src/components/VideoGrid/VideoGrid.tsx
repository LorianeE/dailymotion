import type { VideoSummary } from "../../types/video";
import { VideoCard } from "../VideoCard/VideoCard";

type VideoGridProps = {
  videos?: VideoSummary[];
};

export function VideoGrid({ videos = [] }: VideoGridProps) {
  return (
    <section className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground">
        VideoGrid placeholder
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/45 p-4 text-sm text-muted-foreground">
            No videos to render yet
          </div>
        )}
      </div>
    </section>
  );
}
