export type DailymotionVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail_360_url: string;
  "owner.screenname": string;
  channel?: string;
  duration?: number;
  views_total?: number;
  embed_url: string;
};

export type DailymotionSearchResponse = {
  list?: DailymotionVideo[];
  has_more?: boolean;
};
