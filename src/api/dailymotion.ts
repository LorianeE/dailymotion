import type { VideoDetails, VideoSearchResponse } from "../types/video";
import { mapVideo, mapVideos } from "./dailymotion.mapper";
import type {
  DailymotionSearchResponse,
  DailymotionVideo,
} from "./dailymotion.types";

const API_BASE_URL = "https://api.dailymotion.com";
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

export async function getVideoDetails(videoId: string): Promise<VideoDetails> {
  const params = new URLSearchParams({ fields: VIDEO_FIELDS });
  const response = await fetch(
    `${API_BASE_URL}/video/${encodeURIComponent(videoId)}?${params}`,
  );

  if (!response.ok) {
    throw new Error("Video not found.");
  }

  const video = (await response.json()) as DailymotionVideo;

  return mapVideo(video);
}
