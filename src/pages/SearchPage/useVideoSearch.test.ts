import { act, renderHook, waitFor } from "@testing-library/react";
import { searchVideos } from "../../api/dailymotion";
import type { VideoSummary } from "../../types/video";
import { useVideoSearch } from "./useVideoSearch";

vi.mock("../../api/dailymotion", () => ({
  searchVideos: vi.fn(),
}));

const mockedSearchVideos = vi.mocked(searchVideos);

function createDeferredPromise<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((nextResolve, nextReject) => {
    resolve = nextResolve;
    reject = nextReject;
  });

  return { promise, resolve, reject };
}

describe("useVideoSearch", () => {
  beforeEach(() => {
    mockedSearchVideos.mockReset();
  });

  it("trims the search query and calls searchVideos with the normalized value", async () => {
    const deferred = createDeferredPromise<{
      list: VideoSummary[];
      hasMore: boolean;
    }>();
    mockedSearchVideos.mockReturnValue(deferred.promise);

    const { result } = renderHook(() => useVideoSearch());

    act(() => {
      result.current.search("  space  ");
    });

    expect(result.current.query).toBe("space");
    expect(result.current.isLoading).toBe(true);
    expect(mockedSearchVideos).toHaveBeenCalledWith("space");

    await act(async () => {
      deferred.resolve({ list: [], hasMore: false });
      await deferred.promise;
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("clears state and skips the API call when the search is empty", () => {
    const { result } = renderHook(() => useVideoSearch());

    act(() => {
      result.current.search("   ");
    });

    expect(result.current.query).toBe("");
    expect(result.current.videos).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(mockedSearchVideos).not.toHaveBeenCalled();
  });

  it("stores videos and stops loading after a successful search", async () => {
    const videos: VideoSummary[] = [
      {
        id: "1",
        title: "Space Walk",
        thumbnailUrl: "/space.jpg",
        ownerScreenname: "nasa",
      },
    ];
    mockedSearchVideos.mockResolvedValue({ list: videos, hasMore: false });

    const { result } = renderHook(() => useVideoSearch());

    act(() => {
      result.current.search("space");
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.videos).toEqual(videos);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("stores an error, clears videos, and stops loading when the search fails", async () => {
    mockedSearchVideos.mockRejectedValue(new Error("Network failure"));

    const { result } = renderHook(() => useVideoSearch());

    act(() => {
      result.current.search("space");
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Could not load videos. Try another search.",
      );
      expect(result.current.videos).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
