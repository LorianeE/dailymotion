type SearchBarProps = {
  initialValue?: string;
  onSearch?: (value: string) => void;
};

export function SearchBar({
  initialValue = "",
  onSearch,
}: SearchBarProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 p-4 text-sm text-slate-400">
      SearchBar placeholder
      <div className="mt-2 text-xs text-slate-500">
        initialValue: {initialValue || "empty"}
        {onSearch ? " / handler ready" : " / no handler yet"}
      </div>
    </div>
  );
}
