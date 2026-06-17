import { useEffect, useRef, useState } from "react";

import { searchVideos } from "../../api/dailymotion";
import type { VideoSummary } from "../../types/video";

export type UseVideoSearchInput = {
  query: string;
};

export type UseVideoSearchResult = {
  query: string;
  videos: VideoSummary[];
  isLoading: boolean;
  error: string | null;
};

export function useVideoSearch({
  query: queryInput,
}: UseVideoSearchInput): UseVideoSearchResult {
  const query = queryInput.trim();
  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestSearchId = useRef(0);

  useEffect(() => {
    if (!query) {
      latestSearchId.current += 1;
      setVideos([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const searchId = latestSearchId.current + 1;
    latestSearchId.current = searchId;
    setIsLoading(true);
    setError(null);

    void searchVideos(query)
      .then((response) => {
        if (searchId === latestSearchId.current) {
          setVideos(response.list);
        }
      })
      .catch(() => {
        if (searchId === latestSearchId.current) {
          setError("Could not load videos. Try another search.");
          setVideos([]);
        }
      })
      .finally(() => {
        if (searchId === latestSearchId.current) {
          setIsLoading(false);
        }
      });
  }, [query]);

  return {
    query,
    videos,
    isLoading,
    error,
  };
}
