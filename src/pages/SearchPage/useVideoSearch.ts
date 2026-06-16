import { useState } from "react";

import { searchVideos } from "../../api/dailymotion";
import type { VideoSummary } from "../../types/video";

export type UseVideoSearchResult = {
  query: string;
  videos: VideoSummary[];
  isLoading: boolean;
  error: string | null;
  search: (value: string) => void;
};

export function useVideoSearch(): UseVideoSearchResult {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runSearch(nextQuery: string) {
    try {
      const response = await searchVideos(nextQuery);
      setVideos(response.list);
    } catch {
      setError("Could not load videos. Try another search.");
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  }

  function search(value: string) {
    const nextQuery = value.trim();

    setQuery(nextQuery);

    if (!nextQuery) {
      setVideos([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    // TODO: if users can submit multiple searches in quick succession, an older
    // response may arrive after a newer one and overwrite the latest results.
    void runSearch(nextQuery);
  }

  return {
    query,
    videos,
    isLoading,
    error,
    search,
  };
}
