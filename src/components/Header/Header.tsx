import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-border backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          className="text-2xl leading-none text-foreground transition-colors hover:text-primary focus-visible:rounded-md sm:text-3xl"
          to="/"
          aria-label="DailyBrowse home"
        >
          <span className="editorial-title">DailyBrowse</span>
        </Link>
        <span className="text-right text-xs font-medium text-muted-foreground sm:text-sm">
          Powered by{" "}
          <a
            className="text-foreground/85 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:rounded-sm"
            href="https://www.dailymotion.com"
            rel="noreferrer"
            target="_blank"
          >
            Dailymotion
          </a>
        </span>
      </div>
    </header>
  );
}
