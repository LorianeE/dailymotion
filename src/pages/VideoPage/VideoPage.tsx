import { useEffect, useState } from "react";

import { Button } from "../../components/ui/button";
import { BackToSearchLink } from "./components/BackToSearchLink";
import { CreatorBlock } from "./components/CreatorBlock";
import { DescriptionBlock } from "./components/DescriptionBlock";
import { Tags } from "./components/Tags";
import { VideoDetailsAside } from "./components/VideoDetailsAside";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoTitleSkeleton } from "./components/VideoTitleSkeleton";
import { useVideoDetails } from "./useVideoDetails";

export function VideoPage() {
  const [liked, setLiked] = useState<boolean>(false);
  const { videoId, video, isLoading, error, notFound, retry } =
    useVideoDetails();
  const displayedLikes =
    video?.likes === undefined ? undefined : video.likes + (liked ? 1 : 0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

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

      <VideoPlayer
        isLoading={isLoading}
        title={video?.title}
        videoId={videoId}
      />

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

        <VideoDetailsAside
          createdTime={video?.createdTime}
          duration={video?.duration}
          isLoading={isLoading}
          likes={displayedLikes}
          views={video?.views}
        />
      </article>
    </div>
  );
}
