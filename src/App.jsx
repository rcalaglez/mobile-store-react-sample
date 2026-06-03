import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
