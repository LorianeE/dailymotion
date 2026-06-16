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
      className="rounded-full border border-dashed border-slate-700 px-4 py-2 text-sm text-slate-300"
      onClick={onToggle}
      type="button"
    >
      LikeButton placeholder: {isLiked ? "liked" : "not liked"}
    </button>
  );
}
