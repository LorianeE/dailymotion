type SearchBarProps = {
  initialValue?: string;
  onSearch?: (value: string) => void;
};

export function SearchBar({
  initialValue = "",
  onSearch,
}: SearchBarProps) {
  return (
    <div className="glass-surface rounded-2xl border border-dashed p-4 text-sm text-muted-foreground">
      SearchBar placeholder
      <div className="mt-2 text-xs text-muted-foreground/75">
        initialValue: {initialValue || "empty"}
        {onSearch ? " / handler ready" : " / no handler yet"}
      </div>
    </div>
  );
}
