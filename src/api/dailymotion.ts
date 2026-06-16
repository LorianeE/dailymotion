import type { VideoDetails, VideoSearchResponse } from "../types/video";
import { videoCatalog } from "./mock/dailymotion";

export function searchVideos(query: string): Promise<VideoSearchResponse> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return Promise.resolve({ list: [], hasMore: false });
  }

  const list = videoCatalog.filter((video) => {
    const searchableText = [
      video.title,
      video.ownerScreenname,
      video.category,
      video.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return Promise.resolve({ list, hasMore: false });
}

export function getVideoDetails(videoId: string): Promise<VideoDetails> {
  const video = videoCatalog.find((item) => item.id === videoId);

  if (!video) {
    return Promise.reject(new Error("Video not found."));
  }

  return Promise.resolve(video);
}
