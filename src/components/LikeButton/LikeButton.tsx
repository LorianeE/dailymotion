import { Heart } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

type LikeButtonProps = {
  isLiked?: boolean;
  onToggle?: () => void;
};

export function LikeButton({
  isLiked = false,
  onToggle,
}: LikeButtonProps) {
  return (
    <Button
      aria-pressed={isLiked}
      className="gap-2"
      onClick={onToggle}
      size="sm"
      type="button"
      variant={isLiked ? "default" : "outline"}
    >
      <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
}
