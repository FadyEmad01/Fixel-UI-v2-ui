import HeaderUILibraryPage from "@/feature/doc/ui/components/header-ui-library-page";
import UILibraryPage from "@/feature/doc/ui/components/ui-library-page";
import UILibrarySkeleton from "@/feature/doc/ui/components/ui-library-skeleton";
import { Suspense } from "react";

interface UIPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default function page({ searchParams }: UIPageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-62.5 pb-10 md:px-6 lg:px-8">
      <HeaderUILibraryPage />

      <hr className="my-6 border-border" />

      {/* Awaiting request-time data (searchParams + uncached reads) inside
        Suspense keeps the static shell instant under Cache Components. */}
      <Suspense
        fallback={
          <UILibrarySkeleton />
        }
      >
        <UILibraryPage searchParams={searchParams}/>
      </Suspense>
    </main>
  );
}

