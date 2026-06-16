import type { VideoSummary } from "../../types/video";

type VideoCardProps = {
  video?: VideoSummary;
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="rounded-2xl border border-dashed border-border bg-card/75 p-4 text-sm text-muted-foreground">
      VideoCard placeholder
      <div className="mt-2 text-xs text-muted-foreground/75">
        {video ? video.title : "No video bound yet"}
      </div>
    </article>
  );
}
