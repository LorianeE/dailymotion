import type { VideoDetails, VideoSearchResponse } from "../types/video";

export function searchVideos(query: string): Promise<VideoSearchResponse> {
  void query;

  return Promise.reject(new Error("searchVideos is not implemented yet."));
}

export function getVideoDetails(videoId: string): Promise<VideoDetails> {
  void videoId;

  return Promise.reject(new Error("getVideoDetails is not implemented yet."));
}
