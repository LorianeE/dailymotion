export type DailymotionVideo = {
  id: string;
  title: string;
  description?: string;
  thumbnail_360_url?: string;
  thumbnail_720_url?: string;
  "owner.screenname"?: string;
  "owner.avatar_120_url"?: string;
  channel?: string;
  duration?: number;
  views_total?: number;
  likes_total?: number;
  created_time?: number;
  tags?: string[];
  embed_url?: string;
};

export type DailymotionSearchResponse = {
  list?: DailymotionVideo[];
  has_more?: boolean;
};
