import { Link } from "react-router-dom";

import type { VideoSummary } from "../../types/video";
import { formatDuration, formatViews } from "../../utils/videoFormat";

type VideoCardProps = {
  video: VideoSummary;
  searchQuery?: string;
};

export function VideoCard({ video, searchQuery }: VideoCardProps) {
  const duration = formatDuration(video.duration);
  const views = formatViews(video.views);

  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card/70 transition-colors hover:border-primary/45 hover:bg-card">
      <Link
        className="block focus-visible:outline-none"
        state={searchQuery ? { returnToSearch: { query: searchQuery } } : null}
        to={`/videos/${video.id}`}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            src={video.thumbnailUrl}
          />
          {duration ? (
            <span className="absolute bottom-2 right-2 rounded bg-background/85 px-2 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
              {duration}
            </span>
          ) : null}
        </div>

        <div className="space-y-2 p-3">
          <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="truncate">{video.category ?? "Video"}</span>
            {views ? <span className="shrink-0">{views}</span> : null}
          </div>
          <h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-5 text-foreground">
            {video.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {video.ownerScreenname}
          </p>
        </div>
      </Link>
    </article>
  );
}
