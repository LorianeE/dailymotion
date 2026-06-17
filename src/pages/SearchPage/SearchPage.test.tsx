import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { searchVideos } from "../../api/dailymotion";
import { SearchPage } from "./SearchPage";

vi.mock("../../api/dailymotion", () => ({
  searchVideos: vi.fn(),
}));

const mockedSearchVideos = vi.mocked(searchVideos);

function renderSearchPage(initialEntry = "/") {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <SearchPage />,
      },
    ],
    { initialEntries: [initialEntry] },
  );

  render(<RouterProvider router={router} />);

  return router;
}

describe("SearchPage", () => {
  beforeEach(() => {
    mockedSearchVideos.mockResolvedValue({ list: [], hasMore: false });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the homepage hero without a default trending section", () => {
    renderSearchPage();

    expect(
      screen.getByRole("heading", {
        name: /find something worth watching/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search for anything/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /trending now/i }),
    ).not.toBeInTheDocument();
  });

  it("shows results after a suggestion is selected", async () => {
    const user = userEvent.setup();

    renderSearchPage();

    await user.click(screen.getByRole("button", { name: "Space" }));

    expect(
      await screen.findByRole("heading", { name: /results for "space"/i }),
    ).toBeInTheDocument();
  });

  it("writes the submitted search query to the URL", async () => {
    const user = userEvent.setup();
    const router = renderSearchPage();

    await user.type(
      screen.getByPlaceholderText(/search for anything/i),
      "space",
    );
    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(router.state.location.pathname).toBe("/");
    expect(router.state.location.search).toBe("?query=space");
    await waitFor(() => {
      expect(mockedSearchVideos).toHaveBeenCalledWith("space");
    });
  });

  it("hydrates the search from the URL query", async () => {
    renderSearchPage("/?query=space");

    expect(
      await screen.findByRole("heading", { name: /results for "space"/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search for anything/i)).toHaveValue(
      "space",
    );
    expect(mockedSearchVideos).toHaveBeenCalledWith("space");
  });
});
