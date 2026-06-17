# Dailymotion Video Browser

## Project goal

This project is a technical assignment for a small video browsing application powered by the Dailymotion public API.

The application currently provides:

- A search page to find videos
- A video details page with an embedded player
- A like / unlike interaction on the video details page, stored in local component state

## Chosen stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS v4
- Vitest
- React Testing Library
- `@testing-library/user-event`
- ESLint
- Prettier

## Architecture

The codebase uses a page-oriented structure:

```txt
src/
  app/
    App.tsx
    router.tsx
  pages/
    SearchPage/
      SearchPage.tsx
      SearchPage.test.tsx
      SearchSuggestions.tsx
      useVideoSearch.ts
      useVideoSearch.test.ts
    VideoPage/
      VideoPage.tsx
      VideoPage.test.tsx
      useVideoDetails.ts
      components/
        BackToSearchLink.tsx
        CreatorBlock.tsx
        DescriptionBlock.tsx
        Tags.tsx
        VideoDetailsAside.tsx
        VideoPlayer.tsx
        VideoTitleSkeleton.tsx
  components/
    Header/
    Layout/
    LikeButton/
    SearchBar/
    VideoCard/
    VideoGrid/
    ui/
      button.tsx
      input.tsx
  api/
    dailymotion/
      index.ts
      searchVideos.ts
      getVideoDetails.ts
      config.ts
      mapper.ts
      types.ts
    mock/
      dailymotion.ts
  lib/
    utils.ts
  types/
    video.ts
  utils/
    videoFormat.ts
  test/
    setup.ts
```

Routing and app bootstrap stay in `src/app/`, with routes for `/` and `/videos/:videoId`.

Each page owns its local logic through colocated hooks, tests, and page-specific UI where that pattern is already useful:

- `SearchPage/SearchPage.tsx`
- `SearchPage/useVideoSearch.ts`
- `SearchPage/SearchPage.test.tsx`
- `VideoPage/VideoPage.tsx`
- `VideoPage/useVideoDetails.ts`
- `VideoPage/components/*`

Shared UI stays in `src/components/`, while API access is exposed through the `src/api/dailymotion` module. The repository also contains a small mock catalog under `src/api/mock/` that can be used independently from the live API layer.

Page-specific UI components should stay colocated with the page that owns them, under a local `components/` folder such as `src/pages/VideoPage/components/`. This keeps the top-level page file focused on data flow, state, and layout composition, while avoiding the promotion of one-off UI blocks into the shared `src/components/` namespace before they have a real second consumer.

## Why page-oriented architecture

For this exercise I deliberately chose a simple page-oriented structure rather than a feature-based architecture. With only two pages and a single domain (videos), a feature folder would add unnecessary nesting. For a larger application with multiple business domains, I would likely move toward a feature-oriented structure.

This keeps the initial codebase easy to scan while still leaving room to grow. It also matches the scope of the assignment: two pages, one API surface, and a limited amount of state.

## Testing strategy

Tests are colocated with the page or hook they cover. This keeps behavior and verification close together and avoids a disconnected global test tree.

The current testing approach focuses on:

- Page rendering and routing behavior
- User interactions such as suggestion selection and like toggling
- Search hook behavior such as trimming input, loading state, success, and failure flows
- API layer mocking in unit and integration-style UI tests

Only shared test bootstrap lives outside colocated tests, in `src/test/setup.ts`.

## Future improvements

- Infinite scrolling pagination
- Better loading states
- API caching strategy
- Accessibility improvements
- Error boundary handling for route failures
- Responsive polish for denser result layouts
