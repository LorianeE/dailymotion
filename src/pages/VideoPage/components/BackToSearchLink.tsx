import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function BackToSearchLink() {
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
