// TODO: See if we can get this from the Dailymotion API, like trending topics
const suggestions = [
  "Surfing",
  "Lo-fi",
  "Architecture",
  "Formula 1",
  "Cooking",
  "Space",
];

type SearchSuggestionsProps = {
  onSelect: (suggestion: string) => void;
};

export function SearchSuggestions({ onSelect }: SearchSuggestionsProps) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
      <span className="text-muted-foreground">Try:</span>
      {suggestions.map((suggestion) => (
        <button
          className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-foreground/85 transition-colors hover:border-primary/50 hover:bg-primary/10"
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          type="button"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
