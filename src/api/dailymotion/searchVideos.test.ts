import { API_BASE_URL } from "./config";
import { searchVideos } from "./searchVideos";

function mockJsonResponse({
  body,
  ok = true,
  status = 200,
}: {
  body?: unknown;
  ok?: boolean;
  status?: number;
}) {
  return {
    json: vi.fn().mockResolvedValue(body),
    ok,
    status,
  } as unknown as Response;
}

describe("searchVideos", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("trims the query and calls the Dailymotion search endpoint with expected params", async () => {
    fetchMock.mockResolvedValue(
      mockJsonResponse({
        body: {
          list: [
            {
              id: "x1",
              title: "Space launch",
              thumbnail_360_url: "https://example.com/thumb.jpg",
              "owner.screenname": "Mission Control",
            },
          ],
          has_more: true,
        },
      }),
    );

    const result = await searchVideos("  space launch  ");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [requestUrl] = fetchMock.mock.calls[0] as [string];
    const url = new URL(requestUrl);
    expect(`${url.origin}${url.pathname}`).toBe(`${API_BASE_URL}/videos`);
    expect(url.searchParams.get("search")).toBe("space launch");
    expect(url.searchParams.get("sort")).toBe("visited");
    expect(url.searchParams.get("limit")).toBe("24");
    expect(url.searchParams.get("fields")).toContain("owner.screenname");
    expect(result).toEqual({
      list: [
        {
          id: "x1",
          title: "Space launch",
          description: undefined,
          thumbnailUrl: "https://example.com/thumb.jpg",
          thumbnail720Url: undefined,
          ownerScreenname: "Mission Control",
          ownerAvatarUrl: undefined,
          category: undefined,
          duration: undefined,
          views: undefined,
          likes: undefined,
          createdTime: undefined,
          tags: undefined,
          embedUrl: undefined,
        },
      ],
      hasMore: true,
    });
  });

  it("returns an empty response without calling fetch for an empty query", async () => {
    await expect(searchVideos("   ")).resolves.toEqual({
      list: [],
      hasMore: false,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("normalizes an empty API response", async () => {
    fetchMock.mockResolvedValue(mockJsonResponse({ body: {} }));

    await expect(searchVideos("space")).resolves.toEqual({
      list: [],
      hasMore: false,
    });
  });

  it("throws when the search request fails", async () => {
    fetchMock.mockResolvedValue(
      mockJsonResponse({ ok: false, status: 500, body: { error: "failed" } }),
    );

    await expect(searchVideos("space")).rejects.toThrow(
      "Could not load videos.",
    );
  });
});
