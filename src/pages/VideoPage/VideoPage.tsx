import { LikeButton } from "../../components/LikeButton/LikeButton";

export function VideoPage() {
  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Video detail
        </p>
        <h1 className="editorial-title text-5xl leading-none text-foreground sm:text-6xl">
          Video details placeholder
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          The embedded player, metadata, and local like persistence are
          intentionally deferred to the next milestones.
        </p>
      </div>

      <div className="glass-surface aspect-video rounded-2xl border border-dashed p-6 text-sm text-muted-foreground sm:p-10">
        Player area placeholder
      </div>

      <LikeButton />
    </section>
  );
}
