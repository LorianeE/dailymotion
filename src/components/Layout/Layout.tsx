import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            className="editorial-title text-2xl text-foreground transition-colors hover:text-primary focus-visible:rounded-md"
            to="/"
          >
            Dailymotion Browser
          </Link>
          <span className="rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium text-muted-foreground">
            Milestone 1 Skeleton
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
