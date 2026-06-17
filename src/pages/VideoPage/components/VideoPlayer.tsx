type VideoPlayerProps = {
  isLoading: boolean;
  title?: string;
  videoId: string;
};

export function VideoPlayer({ isLoading, title, videoId }: VideoPlayerProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-xl bg-foreground shadow-lg ring-1 ring-border">
      <div className="aspect-video">
        {isLoading ? (
          <div className="h-full w-full animate-pulse bg-muted" />
        ) : (
          <iframe
            allow="fullscreen; web-share"
            allowFullScreen
            className="h-full w-full"
            src={`https://geo.dailymotion.com/player.html?video=${videoId}&loop=true`}
            title={title ?? "Dailymotion video player"}
          />
        )}
      </div>
    </section>
  );
}
