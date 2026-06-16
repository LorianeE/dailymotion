import { LikeButton } from "../../components/LikeButton/LikeButton";

export function VideoPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-400">
          Video Page
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          Video details placeholder
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          The embedded player, metadata, and local like persistence are
          intentionally deferred to the next milestones.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-700 p-10 text-sm text-slate-500">
        Player area placeholder
      </div>

      <LikeButton />
    </section>
  );
}
