import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { getVideoDetails } from "../../api/dailymotion";
import type { VideoDetails } from "../../types/video";
import { useVideoDetails } from "./useVideoDetails";

vi.mock("../../api/dailymotion", () => ({
  getVideoDetails: vi.fn(),
}));

const mockedGetVideoDetails = vi.mocked(getVideoDetails);

const video: VideoDetails = {
  id: "x7test",
  title: "Test video",
  thumbnailUrl: "https://example.com/thumb.jpg",
  ownerScreenname: "Test creator",
};

function renderUseVideoDetails(initialEntry = "/videos/x7test") {
  return renderHook(() => useVideoDetails(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route element={children} path="/videos/:videoId" />
          <Route element={children} path="/videos" />
        </Routes>
      </MemoryRouter>
    ),
  });
}

describe("useVideoDetails", () => {
  beforeEach(() => {
    mockedGetVideoDetails.mockReset();
  });

  it("loads video details from the route video id", async () => {
    mockedGetVideoDetails.mockResolvedValue(video);

    const { result } = renderUseVideoDetails();

    await waitFor(() => {
      expect(result.current.video).toEqual(video);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.notFound).toBe(false);
    });
    expect(result.current.videoId).toBe("x7test");
    expect(mockedGetVideoDetails).toHaveBeenCalledWith("x7test");
  });

  it("sets notFound when the API reports a missing video", async () => {
    mockedGetVideoDetails.mockRejectedValue(new Error("Video not found."));

    const { result } = renderUseVideoDetails();

    await waitFor(() => {
      expect(result.current.video).toBeNull();
      expect(result.current.error).toBeNull();
      expect(result.current.notFound).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("sets a retryable error for generic failures", async () => {
    mockedGetVideoDetails.mockRejectedValue(new Error("Network failure"));

    const { result } = renderUseVideoDetails();

    await waitFor(() => {
      expect(result.current.video).toBeNull();
      expect(result.current.error).toBe(
        "Could not load video details. Please try again.",
      );
      expect(result.current.notFound).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("marks the video as not found when there is no route video id", async () => {
    const { result } = renderUseVideoDetails("/videos");

    await waitFor(() => {
      expect(result.current.videoId).toBe("");
      expect(result.current.video).toBeNull();
      expect(result.current.error).toBeNull();
      expect(result.current.notFound).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
    expect(mockedGetVideoDetails).not.toHaveBeenCalled();
  });

  it("retries loading the current video", async () => {
    mockedGetVideoDetails
      .mockRejectedValueOnce(new Error("Network failure"))
      .mockResolvedValueOnce(video);

    const { result } = renderUseVideoDetails();

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Could not load video details. Please try again.",
      );
    });

    result.current.retry();

    await waitFor(() => {
      expect(result.current.video).toEqual(video);
      expect(result.current.error).toBeNull();
      expect(result.current.notFound).toBe(false);
    });
    expect(mockedGetVideoDetails).toHaveBeenCalledTimes(2);
  });
});
