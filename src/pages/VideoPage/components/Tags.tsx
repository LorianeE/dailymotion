type TagsProps = {
  tags: string[];
};

export function Tags({ tags }: TagsProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
        Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 10).map((tag) => (
          <span
            className="rounded-full border border-border bg-accent/40 px-3 py-1 text-xs font-normal text-foreground"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
