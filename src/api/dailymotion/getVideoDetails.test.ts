import { API_BASE_URL } from "./config";
import { getVideoDetails } from "./getVideoDetails";

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

describe("getVideoDetails", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("encodes the video id and maps the video response", async () => {
    fetchMock.mockResolvedValue(
      mockJsonResponse({
        body: {
          id: "video/id",
          title: "Encoded video",
          description: "A video with a slash in its id.",
          thumbnail_720_url: "https://example.com/thumb-720.jpg",
          "owner.screenname": "Creator",
          likes_total: 12,
          views_total: 1000,
        },
      }),
    );

    const result = await getVideoDetails("video/id");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [requestUrl] = fetchMock.mock.calls[0] as [string];
    const url = new URL(requestUrl);
    expect(`${url.origin}${url.pathname}`).toBe(
      `${API_BASE_URL}/video/video%2Fid`,
    );
    expect(url.searchParams.get("fields")).toContain("likes_total");
    expect(result).toEqual({
      id: "video/id",
      title: "Encoded video",
      description: "A video with a slash in its id.",
      thumbnailUrl: "https://example.com/thumb-720.jpg",
      thumbnail720Url: "https://example.com/thumb-720.jpg",
      ownerScreenname: "Creator",
      ownerAvatarUrl: undefined,
      category: undefined,
      duration: undefined,
      views: 1000,
      likes: 12,
      createdTime: undefined,
      tags: undefined,
      embedUrl: undefined,
    });
  });

  it("throws a not found error for a 404 response", async () => {
    fetchMock.mockResolvedValue(
      mockJsonResponse({ ok: false, status: 404, body: {} }),
    );

    await expect(getVideoDetails("missing")).rejects.toThrow(
      "Video not found.",
    );
  });

  it("throws a generic error when the details request fails", async () => {
    fetchMock.mockResolvedValue(
      mockJsonResponse({ ok: false, status: 500, body: {} }),
    );

    await expect(getVideoDetails("x1")).rejects.toThrow(
      "Could not load video details.",
    );
  });

  it("throws a not found error when the API returns an empty video", async () => {
    fetchMock.mockResolvedValue(mockJsonResponse({ body: {} }));

    await expect(getVideoDetails("x1")).rejects.toThrow("Video not found.");
  });
});
