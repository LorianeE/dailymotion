import type { VideoSummary } from "../../types/video";

type VideoCardProps = {
  video?: VideoSummary;
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="rounded-2xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">
      VideoCard placeholder
      <div className="mt-2 text-xs text-slate-500">
        {video ? video.title : "No video bound yet"}
      </div>
    </article>
  );
}
