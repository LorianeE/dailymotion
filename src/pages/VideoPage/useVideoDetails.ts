import { useParams } from "react-router-dom";

export type UseVideoDetailsResult = {
  videoId: string;
};

export function useVideoDetails(): UseVideoDetailsResult {
  const { videoId = "" } = useParams();

  return {
    videoId,
  };
}
