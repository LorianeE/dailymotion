import { Outlet } from "react-router-dom";

import { Header } from "../Header/Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
        <Outlet />
      </main>
    </div>
  );
}
