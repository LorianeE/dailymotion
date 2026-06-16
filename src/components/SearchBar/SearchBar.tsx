import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SearchBarProps = {
  query: string;
  onSearch: (value: string) => void;
};

export function SearchBar({ query, onSearch }: SearchBarProps) {
  const [value, setValue] = useState(query);

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
      <SearchIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
      <Input
        className="h-12 flex-1 px-1"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search for anything…"
        type="search"
        value={value}
      />
      <Button
        className="h-12 shrink-0 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
        type="submit"
      >
        <span>Search</span>
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
