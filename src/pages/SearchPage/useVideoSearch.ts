import { useState } from "react";

export type UseVideoSearchResult = {
  query: string;
  setQuery: (value: string) => void;
};

export function useVideoSearch(): UseVideoSearchResult {
  const [query, setQuery] = useState("");

  return {
    query,
    setQuery,
  };
}
