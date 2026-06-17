import { SearchBar } from "../../components/SearchBar/SearchBar";
import { VideoGrid } from "../../components/VideoGrid/VideoGrid";
import { SearchSuggestions } from "./SearchSuggestions";
import { useVideoSearch } from "./useVideoSearch";

export function SearchPage() {
  const { query, videos, isLoading, error, search } = useVideoSearch();
  const hasActiveSearch = query.length > 0;

  return (
    <div>
      <section className="mx-auto max-w-4xl pt-20 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          A SMALL VIDEO BROWSER
        </p>
        <h1 className="mt-5 font-display text-6xl leading-[1.02] text-foreground sm:text-7xl">
          Find something <em className="text-primary">worth</em> watching.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Search Dailymotion&apos;s open catalog. No accounts, no algorithm
          chasing you around — just a search box and a player.
        </p>

        <SearchBar onSearch={search} query={query} />
        <SearchSuggestions onSelect={search} />
      </section>

      {hasActiveSearch ? (
        <section className="mt-16 space-y-6">
          <h2 className="font-display text-3xl text-foreground">
            Results for <em className="text-primary">&quot;{query}&quot;</em>
          </h2>
          <VideoGrid
            emptyDescription="Nothing in the local catalog matched that query. Try another mood, topic, or channel."
            error={error}
            isLoading={isLoading}
            searchQuery={query}
            videos={videos}
          />
        </section>
      ) : null}
    </div>
  );
}
