import { SearchBar } from "../../components/SearchBar/SearchBar";
import { VideoGrid } from "../../components/VideoGrid/VideoGrid";

export function SearchPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-400">
          Search Page
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Browse Dailymotion videos
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Milestone 1 keeps the page empty on purpose. Search state, URL sync,
          debounce, loading states, and API wiring will be added later.
        </p>
      </div>

      <SearchBar />
      <VideoGrid />
    </section>
  );
}
