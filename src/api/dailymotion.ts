import type { VideoDetails, VideoSearchResponse } from "../types/video";
import { mapVideo, mapVideos } from "./dailymotion.mapper";
import type {
  DailymotionSearchResponse,
  DailymotionVideo,
} from "./dailymotion.types";

// TODO: Ne devrait-on pas avoir plutôt un dossier "dailymotion" et dedans un fichier par méthode appelée ?


const API_BASE_URL = "https://api.dailymotion.com";
// TODO: VIDEO_FIELDS a-t-on besoin de tout ça du coup ?
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
const VIDEO_DETAILS_FIELDS = [
  "id",
  "title",
  "description",
  "duration",
  "views_total",
  "likes_total",
  "created_time",
  "thumbnail_720_url",
  "tags",
  "owner.screenname",
  "owner.avatar_120_url",
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
  const params = new URLSearchParams({ fields: VIDEO_DETAILS_FIELDS });
  const response = await fetch(
    `${API_BASE_URL}/video/${encodeURIComponent(videoId)}?${params}`,
  );

  if (response.status === 404) {
    throw new Error("Video not found.");
  }

  if (!response.ok) {
    throw new Error("Could not load video details.");
  }

  const video = (await response.json()) as DailymotionVideo;

  if (!video.id) {
    throw new Error("Video not found.");
  }

  return mapVideo(video);
}
