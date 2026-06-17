import { useRef, useState } from "react";

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
  const latestSearchId = useRef(0);

  async function runSearch(nextQuery: string, searchId: number) {
    try {
      const response = await searchVideos(nextQuery);
      if (searchId === latestSearchId.current) {
        setVideos(response.list);
      }
    } catch {
      if (searchId === latestSearchId.current) {
        setError("Could not load videos. Try another search.");
        setVideos([]);
      }
    } finally {
      if (searchId === latestSearchId.current) {
        setIsLoading(false);
      }
    }
  }

  function search(value: string) {
    const nextQuery = value.trim();

    setQuery(nextQuery);

    if (!nextQuery) {
      latestSearchId.current += 1;
      setVideos([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    const searchId = latestSearchId.current + 1;
    latestSearchId.current = searchId;
    void runSearch(nextQuery, searchId);
  }

  return {
    query,
    videos,
    isLoading,
    error,
    search,
  };
}
