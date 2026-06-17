import type { VideoDetails } from "../../types/video";
import { API_BASE_URL } from "./config";
import { mapVideo } from "./mapper";
import type { DailymotionVideo } from "./types";

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
