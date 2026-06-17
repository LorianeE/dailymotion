import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Eye,
  Heart,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../utils/videoFormat";
import { useVideoDetails } from "./useVideoDetails";

const EMPTY_VALUE = "—";

export function VideoPage() {
  const [liked, setLiked] = useState<boolean>(false);
  const { videoId, video, isLoading, error, notFound, retry } =
    useVideoDetails();
  const displayedLikes =
    video?.likes === undefined ? undefined : video.likes + (liked ? 1 : 0);

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-2 py-8 sm:px-6">
        <BackToSearchLink />
        <section className="mt-20 rounded-lg border border-border bg-card px-6 py-12 text-center">
          <h1 className="font-display text-3xl text-foreground">
            Couldn&apos;t load this video
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            {error}
          </p>
          <Button
            className="mt-6 rounded-lg border border-border bg-accent/40 px-4 py-2 text-foreground hover:bg-accent"
            onClick={retry}
          >
            Try again
          </Button>
        </section>
      </div>
    );
  }

  if (!isLoading && notFound) {
    return (
      <div className="mx-auto max-w-5xl px-2 py-8 sm:px-6">
        <BackToSearchLink />
        <p className="mt-20 text-center font-display text-3xl text-foreground">
          Video not found.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-2 py-8 sm:px-6">
      <BackToSearchLink />

      <section className="mt-6 overflow-hidden rounded-xl bg-foreground shadow-lg ring-1 ring-border">
        <div className="aspect-video">
          {isLoading ? (
            <div className="h-full w-full animate-pulse bg-muted" />
          ) : (
            <iframe
              allow="autoplay; fullscreen; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
              src={`https://geo.dailymotion.com/player.html?video=${videoId}&loop=true`}
              title={video?.title ?? "Dailymotion video player"}
            />
          )}
        </div>
      </section>

      <article className="mt-8 grid gap-10 lg:grid-cols-[1fr_260px]">
        <div className="space-y-7">
          <section className="space-y-5">
            {isLoading ? (
              <VideoTitleSkeleton />
            ) : (
              <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
                {video?.title ?? "Video not found."}
              </h1>
            )}

            <CreatorBlock
              avatarUrl={video?.ownerAvatarUrl}
              isLoading={isLoading}
              liked={liked}
              name={video?.ownerScreenname}
              onToggleLiked={() => setLiked((v) => !v)}
            />
          </section>

          <DescriptionBlock
            description={video?.description}
            isLoading={isLoading}
          />

          {video?.tags?.length ? <Tags tags={video.tags} /> : null}
        </div>

        <aside className="space-y-3 lg:border-l lg:border-border lg:pl-6">
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
            Details
          </h2>
          <StatCard
            icon={<ViewsIcon />}
            isLoading={isLoading}
            label="Views"
            value={formatViews(video?.views)}
          />
          <StatCard
            icon={<LikesIcon />}
            isLoading={isLoading}
            label="Likes"
            value={formatCompactNumber(displayedLikes)}
          />
          <StatCard
            icon={<DurationIcon />}
            isLoading={isLoading}
            label="Duration"
            value={formatDuration(video?.duration)}
          />
          <StatCard
            icon={<PublishedIcon />}
            isLoading={isLoading}
            label="Published"
            value={formatDate(video?.createdTime)}
          />
        </aside>
      </article>
    </div>
  );
}

function BackToSearchLink() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-md"
      to="/"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to search</span>
    </Link>
  );
}

function CreatorBlock({
  avatarUrl,
  isLoading,
  liked,
  name,
  onToggleLiked,
}: {
  avatarUrl?: string;
  isLoading: boolean;
  liked: boolean;
  name?: string;
  onToggleLiked: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
      <div className="flex items-center gap-3">
        {isLoading ? (
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
        ) : avatarUrl ? (
          <img
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
            src={avatarUrl}
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-accent ring-1 ring-border" />
        )}

        <div className="min-w-0">
          {isLoading ? (
            <div className="h-4 w-36 animate-pulse rounded-full bg-muted" />
          ) : (
            <p className="truncate text-sm font-medium text-foreground">
              {name ?? "Dailymotion creator"}
            </p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">Creator</p>
        </div>
      </div>

      {!isLoading ? (
        <Button
          aria-pressed={liked}
          className="gap-2"
          onClick={onToggleLiked}
          size="sm"
          type="button"
          variant={liked ? "default" : "outline"}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-current")} />
          {liked ? "Liked" : "Like"}
        </Button>
      ) : null}
    </div>
  );
}

function DescriptionBlock({
  description,
  isLoading,
}: {
  description?: string;
  isLoading: boolean;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
        Description
      </h2>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
        </div>
      ) : description ? (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {description}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          No description available.
        </p>
      )}
    </section>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
        Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 10).map((tag) => (
          <span
            className="rounded-full border border-border bg-accent/40 px-3 py-1 text-xs font-normal text-foreground"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function StatCard({
  icon,
  isLoading,
  label,
  value,
}: {
  icon: React.ReactNode;
  isLoading: boolean;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
      <span className="mt-0.5 h-4 w-4 shrink-0 text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        {isLoading ? (
          <div className="mt-1 h-4 w-24 animate-pulse rounded-full bg-muted" />
        ) : (
          <p className="truncate text-sm font-medium text-foreground">
            {value ?? EMPTY_VALUE}
          </p>
        )}
      </div>
    </div>
  );
}

function VideoTitleSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-9 w-full animate-pulse rounded-full bg-muted sm:h-11" />
      <div className="h-9 w-3/4 animate-pulse rounded-full bg-muted sm:h-11" />
    </div>
  );
}

function formatCompactNumber(value?: number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
function ViewsIcon() {
  return <Eye aria-hidden="true" className="h-4 w-4" />;
}

function LikesIcon() {
  return <ThumbsUp aria-hidden="true" className="h-4 w-4" />;
}

function DurationIcon() {
  return <Clock3 aria-hidden="true" className="h-4 w-4" />;
}

function PublishedIcon() {
  return <Calendar aria-hidden="true" className="h-4 w-4" />;
}
