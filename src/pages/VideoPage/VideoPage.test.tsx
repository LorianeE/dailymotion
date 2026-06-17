import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { VideoDetails } from "../../types/video";
import { VideoPage } from "./VideoPage";
import { useVideoDetails } from "./useVideoDetails";
import type { UseVideoDetailsResult } from "./useVideoDetails";

vi.mock("./useVideoDetails", () => ({
  useVideoDetails: vi.fn(),
}));

const mockUseVideoDetails = vi.mocked(useVideoDetails);

const video: VideoDetails = {
  id: "x7test",
  title: "Test video",
  thumbnailUrl: "https://example.com/thumb.jpg",
  ownerScreenname: "Test creator",
  description: "A test video description.",
  duration: 120,
  likes: 42,
  views: 1000,
};

function mockVideoDetails(overrides: Partial<UseVideoDetailsResult> = {}) {
  mockUseVideoDetails.mockReturnValue({
    videoId: video.id,
    video,
    isLoading: false,
    error: null,
    notFound: false,
    retry: vi.fn(),
    ...overrides,
  });
}

function renderVideoPage() {
  return render(
    <MemoryRouter>
      <VideoPage />
    </MemoryRouter>,
  );
}

describe("VideoPage like button", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("scrolls to the top when the page is displayed", () => {
    mockVideoDetails();

    renderVideoPage();

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  it("toggles between Like and Liked and updates the likes total", async () => {
    const user = userEvent.setup();
    mockVideoDetails();

    renderVideoPage();

    const likeButton = screen.getByRole("button", { name: "Like" });

    expect(likeButton).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByText("42")).toBeInTheDocument();

    await user.click(likeButton);

    expect(screen.getByRole("button", { name: "Liked" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("43")).toBeInTheDocument();
    expect(screen.queryByText("42")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Liked" }));

    expect(screen.getByRole("button", { name: "Like" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.queryByText("43")).not.toBeInTheDocument();
  });

  it("does not render while the video details are loading", () => {
    mockVideoDetails({
      isLoading: true,
      video: null,
    });

    renderVideoPage();

    expect(
      screen.queryByRole("button", { name: /like/i }),
    ).not.toBeInTheDocument();
  });
});
