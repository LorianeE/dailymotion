import type { FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SearchBarProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSearch: (value: string) => void;
};

export function SearchBar({ value, onValueChange, onSearch }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value);
  }

  return (
    <form
      className="mt-10 flex items-center gap-2 rounded-full border border-border bg-card/60 p-2 pl-5 shadow-[0_30px_60px_-30px_rgba(168,85,247,0.35)] backdrop-blur"
      onSubmit={handleSubmit}
      role="search"
    >
      <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
      <Input
        className="h-12 flex-1 px-1"
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Search for anything…"
        type="search"
        value={value}
      />
      <Button
        className="h-12 shrink-0 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        type="submit"
      >
        <span>Search</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
