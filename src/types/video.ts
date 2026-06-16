export type VideoSummary = {
  id: string;
  title: string;
  thumbnailUrl: string;
  ownerScreenname: string;
  category?: string;
  duration?: number;
  views?: number;
};

export type VideoDetails = VideoSummary & {
  description?: string;
  likes?: number;
  createdTime?: number;
  thumbnail720Url?: string;
  tags?: string[];
  ownerAvatarUrl?: string;
  embedUrl?: string;
};

export type VideoSearchResponse = {
  list: VideoSummary[];
  hasMore: boolean;
};
