type LikeButtonProps = {
  isLiked?: boolean;
  onToggle?: () => void;
};

export function LikeButton({
  isLiked = false,
  onToggle,
}: LikeButtonProps) {
  return (
    <button
      className="rounded-full border border-border bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
      onClick={onToggle}
      type="button"
    >
      LikeButton placeholder: {isLiked ? "liked" : "not liked"}
    </button>
  );
}
