# Dailymotion Video Browser

## Project goal

This project is a technical assignment for a small video browsing application powered by the Dailymotion public API.

The application will provide:

- A search page to find videos
- A video details page with an embedded player
- Local like / unlike persistence using `localStorage`

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
  pages/
    SearchPage/
    VideoPage/
  components/
    SearchBar/
    VideoCard/
    VideoGrid/
    LikeButton/
    Layout/
  api/
    dailymotion.ts
  types/
    video.ts
  test/
    setup.ts
```

Routing and app bootstrap stay in `src/app/`.

Each page owns its local logic through colocated hooks and tests:

- `SearchPage/SearchPage.tsx`
- `SearchPage/useVideoSearch.ts`
- `SearchPage/SearchPage.test.tsx`

Shared UI stays in `src/components/`, while API access is intentionally centralized in `src/api/dailymotion.ts`.

## Why page-oriented architecture

For this exercise I deliberately chose a simple page-oriented structure rather than a feature-based architecture. With only two pages and a single domain (videos), a feature folder would add unnecessary nesting. For a larger application with multiple business domains, I would likely move toward a feature-oriented structure.

This keeps the initial codebase easy to scan while still leaving room to grow. It also matches the scope of the assignment: two pages, one API surface, and a limited amount of state.

## Testing strategy

Tests are colocated with the page or component they cover. This keeps behavior and verification close together and avoids a disconnected global test tree.

The testing approach will focus on:

- Page rendering and routing behavior
- User interactions such as typing, navigation, and like toggling
- URL query parameter synchronization for search
- Local persistence behavior for liked videos
- API layer mocking in unit and integration-style UI tests

Only shared test bootstrap lives outside colocated tests, in `src/test/setup.ts`.

## Future improvements

- Infinite scrolling pagination
- Better loading states
- API caching strategy
- Accessibility improvements
- Error boundary handling for route failures
- Responsive polish for denser result layouts
