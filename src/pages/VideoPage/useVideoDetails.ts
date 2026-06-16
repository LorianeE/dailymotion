import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getVideoDetails } from "../../api/dailymotion";
import type { VideoDetails } from "../../types/video";

export type UseVideoDetailsResult = {
  videoId: string;
  video: VideoDetails | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
  retry: () => void;
};

export function useVideoDetails(): UseVideoDetailsResult {
  const { videoId = "" } = useParams();
  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadVideo = useCallback(async () => {
    if (!videoId) {
      setVideo(null);
      setError(null);
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setNotFound(false);
      const nextVideo = await getVideoDetails(videoId);
      setVideo(nextVideo);
    } catch (caughtError) {
      setVideo(null);
      if (
        caughtError instanceof Error &&
        caughtError.message === "Video not found."
      ) {
        setNotFound(true);
        setError(null);
      } else {
        setNotFound(false);
        setError("Could not load video details. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    void Promise.resolve().then(loadVideo);
  }, [loadVideo]);

  return {
    videoId,
    video,
    isLoading,
    error,
    notFound,
    retry: () => {
      void loadVideo();
    },
  };
}
