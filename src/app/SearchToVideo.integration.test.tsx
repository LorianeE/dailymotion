import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { getVideoDetails, searchVideos } from "../api/dailymotion";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { VideoPage } from "../pages/VideoPage/VideoPage";
import type { VideoDetails, VideoSummary } from "../types/video";

vi.mock("../api/dailymotion", () => ({
  getVideoDetails: vi.fn(),
  searchVideos: vi.fn(),
}));

const mockedSearchVideos = vi.mocked(searchVideos);
const mockedGetVideoDetails = vi.mocked(getVideoDetails);

function TestLayout() {
  return <Outlet />;
}

function LocationStateProbe() {
  const location = useLocation();

  return (
    <output data-testid="location-state">
      {JSON.stringify(location.state)}
    </output>
  );
}

describe("search to video integration", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("navigates from a mocked search result to the video page with return state", async () => {
    const user = userEvent.setup();
    const videoSummary: VideoSummary = {
      id: "xmocked",
      title: "Mocked space launch",
      thumbnailUrl: "https://example.com/space.jpg",
      ownerScreenname: "Mission Control",
      duration: 120,
      views: 42000,
    };
    const videoDetails: VideoDetails = {
      ...videoSummary,
      description: "A mocked launch video.",
      likes: 12,
    };
    mockedSearchVideos.mockResolvedValueOnce({
      list: [videoSummary],
      hasMore: false,
    });
    mockedGetVideoDetails.mockResolvedValueOnce(videoDetails);
    vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <TestLayout />,
          children: [
            {
              index: true,
              element: <SearchPage />,
            },
            {
              path: "videos/:videoId",
              element: (
                <>
                  <LocationStateProbe />
                  <VideoPage />
                </>
              ),
            },
          ],
        },
      ],
      { initialEntries: ["/"] },
    );

    render(<RouterProvider router={router} />);

    await user.type(
      screen.getByPlaceholderText(/search for anything/i),
      "space",
    );
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(mockedSearchVideos).toHaveBeenCalledWith("space");

    await user.click(
      await screen.findByRole("link", { name: /mocked space launch/i }),
    );

    expect(
      await screen.findByRole("heading", { name: videoDetails.title }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/videos/xmocked");
    expect(screen.getByTestId("location-state")).toHaveTextContent(
      JSON.stringify({ returnToSearch: { query: "space" } }),
    );
  });
});
