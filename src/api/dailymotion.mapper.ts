import type { VideoDetails, VideoSummary } from "../types/video";
import type { DailymotionVideo } from "./dailymotion.types";

export function mapVideos(videos: DailymotionVideo[]): VideoSummary[] {
  return videos.map(mapVideo);
}

export function mapVideo(video: DailymotionVideo): VideoDetails {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail_360_url,
    ownerScreenname: video["owner.screenname"],
    category: video.channel,
    duration: video.duration,
    views: video.views_total,
    embedUrl: video.embed_url,
  };
}
