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
    thumbnailUrl: video.thumbnail_360_url ?? video.thumbnail_720_url ?? "",
    thumbnail720Url: video.thumbnail_720_url,
    ownerScreenname: video["owner.screenname"] ?? "Dailymotion creator",
    ownerAvatarUrl: video["owner.avatar_120_url"],
    category: video.channel,
    duration: video.duration,
    views: video.views_total,
    likes: video.likes_total,
    createdTime: video.created_time,
    tags: video.tags,
    embedUrl: video.embed_url,
  };
}
