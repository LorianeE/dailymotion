import type { DailymotionVideo } from "./types";
import { mapVideo, mapVideos } from "./mapper";

describe("Dailymotion mapper", () => {
  it("maps Dailymotion video fields to the internal video model", () => {
    const video: DailymotionVideo = {
      id: "x1",
      title: "Surfing",
      description: "Big waves.",
      thumbnail_360_url: "https://example.com/thumb-360.jpg",
      thumbnail_720_url: "https://example.com/thumb-720.jpg",
      "owner.screenname": "Ocean Channel",
      "owner.avatar_120_url": "https://example.com/avatar.jpg",
      channel: "sport",
      duration: 95,
      views_total: 1234,
      likes_total: 42,
      created_time: 1700000000,
      tags: ["surf", "ocean"],
      embed_url: "https://www.dailymotion.com/embed/video/x1",
    };

    expect(mapVideo(video)).toEqual({
      id: "x1",
      title: "Surfing",
      description: "Big waves.",
      thumbnailUrl: "https://example.com/thumb-360.jpg",
      thumbnail720Url: "https://example.com/thumb-720.jpg",
      ownerScreenname: "Ocean Channel",
      ownerAvatarUrl: "https://example.com/avatar.jpg",
      category: "sport",
      duration: 95,
      views: 1234,
      likes: 42,
      createdTime: 1700000000,
      tags: ["surf", "ocean"],
      embedUrl: "https://www.dailymotion.com/embed/video/x1",
    });
  });

  it("falls back to the 720 thumbnail when the 360 thumbnail is missing", () => {
    expect(
      mapVideo({
        id: "x2",
        title: "Architecture",
        thumbnail_720_url: "https://example.com/thumb-720.jpg",
      }).thumbnailUrl,
    ).toBe("https://example.com/thumb-720.jpg");
  });

  it("falls back to an empty thumbnail and default owner when optional fields are missing", () => {
    expect(
      mapVideo({
        id: "x3",
        title: "Untitled",
      }),
    ).toEqual({
      id: "x3",
      title: "Untitled",
      description: undefined,
      thumbnailUrl: "",
      thumbnail720Url: undefined,
      ownerScreenname: "Dailymotion creator",
      ownerAvatarUrl: undefined,
      category: undefined,
      duration: undefined,
      views: undefined,
      likes: undefined,
      createdTime: undefined,
      tags: undefined,
      embedUrl: undefined,
    });
  });

  it("maps a list of videos", () => {
    expect(
      mapVideos([
        {
          id: "x4",
          title: "First",
        },
        {
          id: "x5",
          title: "Second",
        },
      ]),
    ).toHaveLength(2);
  });
});
