import { LikeButton } from "../../../components/LikeButton/LikeButton";

type CreatorBlockProps = {
  avatarUrl?: string;
  isLoading: boolean;
  liked: boolean;
  name?: string;
  onToggleLiked: () => void;
};

export function CreatorBlock({
  avatarUrl,
  isLoading,
  liked,
  name,
  onToggleLiked,
}: CreatorBlockProps) {
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
        <LikeButton isLiked={liked} onToggle={onToggleLiked} />
      ) : null}
    </div>
  );
}
