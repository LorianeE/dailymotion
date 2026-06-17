import type { ReactNode } from "react";
import { Calendar, Clock3, Eye, ThumbsUp } from "lucide-react";

import {
  formatDate,
  formatDuration,
  formatViews,
} from "../../../utils/videoFormat";

const EMPTY_VALUE = "—";

type VideoDetailsAsideProps = {
  createdTime?: number;
  duration?: number;
  isLoading: boolean;
  likes?: number;
  views?: number;
};

export function VideoDetailsAside({
  createdTime,
  duration,
  isLoading,
  likes,
  views,
}: VideoDetailsAsideProps) {
  return (
    <aside className="space-y-3 lg:border-l lg:border-border lg:pl-6">
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
        Details
      </h2>
      <StatCard
        icon={<Eye aria-hidden="true" className="h-4 w-4" />}
        isLoading={isLoading}
        label="Views"
        value={formatViews(views)}
      />
      <StatCard
        icon={<ThumbsUp aria-hidden="true" className="h-4 w-4" />}
        isLoading={isLoading}
        label="Likes"
        value={formatCompactNumber(likes)}
      />
      <StatCard
        icon={<Clock3 aria-hidden="true" className="h-4 w-4" />}
        isLoading={isLoading}
        label="Duration"
        value={formatDuration(duration)}
      />
      <StatCard
        icon={<Calendar aria-hidden="true" className="h-4 w-4" />}
        isLoading={isLoading}
        label="Published"
        value={formatDate(createdTime)}
      />
    </aside>
  );
}

function StatCard({
  icon,
  isLoading,
  label,
  value,
}: {
  icon: ReactNode;
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

function formatCompactNumber(value?: number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
