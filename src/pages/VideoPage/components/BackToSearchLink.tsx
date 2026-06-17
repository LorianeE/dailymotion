import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type VideoLocationState = {
  returnToSearch?: {
    query?: string;
  };
};

export function BackToSearchLink() {
  const location = useLocation();
  const state = location.state as VideoLocationState | null;
  const query = state?.returnToSearch?.query?.trim() ?? "";
  const backUrl = query
    ? `/?${new URLSearchParams({ query }).toString()}`
    : "/";

  return (
    <Link
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-md"
      to={backUrl}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back to search</span>
    </Link>
  );
}
