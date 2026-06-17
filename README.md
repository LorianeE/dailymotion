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
- `lucide-react`
- Vitest
- React Testing Library
- `@testing-library/user-event`
- ESLint
- Prettier

## Run instructions

```bash
npm install
npm run dev
npm run test:run
npm run lint
npm run build
```

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

## Tradeoffs and decisions

- `lucide-react` was chosen instead of `react-icons` because the app only needs a small, consistent icon set and Lucide keeps the visual language lighter and easier to control.
- The project does not install `shadcn/ui`, but the shared primitives are intentionally built in a shadcn-like style so the app can be connected to the real library later without reshaping the component API.
- A Dailymotion SDK integration would have been the better long-term choice, as recommended by the documentation, especially to listen to player messages and react to playback events properly.
- Search context is passed through React Router state instead of a global store because the app only needs to preserve the previous query across the search-to-video flow.
- The search page uses small `setState` calls inside `useEffect` to keep the input and search results synchronized with the URL query; this is a pragmatic tradeoff for the exercise, and with more time I would explore a cleaner router/data-loading model.
- No global state library was added because the application state is limited to search results, loading and error states, and one local like toggle.
- The API layer exposes simple errors for failed searches and missing videos, while advanced retry, cache invalidation, or offline behavior was left out to keep the implementation aligned with the assignment scope.
- Responsive polish was not handled in depth because it was outside the assignment scope, the player is embedded through an iframe, and this kind of video experience would usually deserve a dedicated mobile app rather than relying on a mobile browser.
- Continuous autoplay was disabled because it would require listening to events emitted by the player, and the documentation points to using a player integration for that instead of managing it through a plain iframe. For the exercise, and because of the available time, the iframe uses `loop=true` instead.

## Testing strategy

Tests are colocated with the page or hook they cover. This keeps behavior and verification close together and avoids a disconnected global test tree.

The current testing approach focuses on:

- Page rendering and routing behavior
- User interactions such as suggestion selection and like toggling
- Search hook behavior such as trimming input, loading state, success, and failure flows
- API layer mocking in unit and integration-style UI tests

Only shared test bootstrap lives outside colocated tests, in `src/test/setup.ts`.

## Known limitations

- Likes are local-only and are not persisted because the public API write flow is outside the assignment scope.
- Search results are limited to the first API page; infinite scrolling or manual pagination would be the next step for larger result sets.
- Error handling is intentionally simple and does not include retries, request cancellation, or offline support.
- The embedded player is iframe-based, so playback events are not consumed by the app.
- Responsive behavior exists at a basic layout level, but mobile-specific polish was not treated as a core requirement for this exercise.

## Future improvements

- Infinite scrolling pagination
- Better loading states
- API caching strategy
- Storybook could be useful for documenting and reviewing reusable UI components such as `VideoCard`, `SearchBar`, `LikeButton`, and shared layout elements in isolation. It was intentionally left out of this exercise to keep the scope focused on the application behavior, tests, and core implementation within the available time.
- Accessibility improvements
- Error boundary handling for route failures
- Responsive polish for denser result layouts
