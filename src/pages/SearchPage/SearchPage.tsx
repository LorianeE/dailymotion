import { SearchBar } from "../../components/SearchBar/SearchBar";
import { VideoGrid } from "../../components/VideoGrid/VideoGrid";

export function SearchPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Editorial search
        </p>
        <h1 className="editorial-title text-5xl leading-none text-foreground sm:text-6xl">
          Browse Dailymotion videos
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Milestone 1 keeps the page empty on purpose. Search state, URL sync,
          debounce, loading states, and API wiring will be added later.
        </p>
      </div>

      <SearchBar />
      <VideoGrid />
    </section>
  );
}
