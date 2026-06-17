import type { VideoSearchResponse } from "../../types/video";
import { API_BASE_URL } from "./config";
import { mapVideos } from "./mapper";
import type { DailymotionSearchResponse } from "./types";

const VIDEO_FIELDS = [
  "id",
  "title",
  "description",
  "thumbnail_360_url",
  "owner.screenname",
  "channel",
  "duration",
  "views_total",
  "embed_url",
].join(",");

export async function searchVideos(
  query: string,
): Promise<VideoSearchResponse> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return { list: [], hasMore: false };
  }

  const params = new URLSearchParams({
    fields: VIDEO_FIELDS,
    search: normalizedQuery,
    sort: "visited",
    limit: "24",
  });
  const response = await fetch(`${API_BASE_URL}/videos?${params}`);

  if (!response.ok) {
    throw new Error("Could not load videos.");
  }

  const data = (await response.json()) as DailymotionSearchResponse;

  return {
    list: mapVideos(data.list ?? []),
    hasMore: data.has_more ?? false,
  };
}
