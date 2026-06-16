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
  description: string;
  embedUrl: string;
};

export type VideoSearchResponse = {
  list: VideoSummary[];
  hasMore: boolean;
};
