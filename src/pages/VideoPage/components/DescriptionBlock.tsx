type DescriptionBlockProps = {
  description?: string;
  isLoading: boolean;
};

export function DescriptionBlock({
  description,
  isLoading,
}: DescriptionBlockProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs uppercase tracking-wider text-muted-foreground">
        Description
      </h2>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
        </div>
      ) : description ? (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {description}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          No description available.
        </p>
      )}
    </section>
  );
}
