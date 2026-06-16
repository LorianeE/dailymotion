export function formatDuration(totalSeconds?: number): string | undefined {
  if (totalSeconds === undefined) {
    return undefined;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${padTime(minutes)}:${padTime(seconds)}`;
  }

  return `${minutes}:${padTime(seconds)}`;
}

export function formatViews(views?: number): string | undefined {
  if (views === undefined) {
    return undefined;
  }

  return `${new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(views)} views`;
}

export function formatDate(unixTimestamp?: number): string | undefined {
  if (unixTimestamp === undefined) {
    return undefined;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(unixTimestamp * 1000));
}

function padTime(value: number): string {
  return value.toString().padStart(2, "0");
}
