const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

const filterWidths = [
  "w-12",
  "w-20",
  "w-16",
  "w-24",
  "w-14",
  "w-20",
];

export default function UILibrarySkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading component library"
      className="min-h-screen bg-background"
    >
      <span className="sr-only">Loading component library...</span>

      <div className="mx-auto max-w-7xl">
        {/* Tag filters and Filter button */}
        <div
          aria-hidden="true"
          className="mb-10 flex flex-row items-center justify-between gap-8 font-archivo"
        >
          {/* Horizontal filter chips */}
          <div className="mx-auto w-full overflow-hidden">
            <div className="scrollbar-none overflow-x-auto">
              <div className="flex w-max gap-2.5">
                {filterWidths.map((width, index) => (
                  <div
                    key={index}
                    className={`skeleton-shimmer h-8 shrink-0 rounded-lg ${width}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Filter button */}
          <div className="skeleton-shimmer h-8 w-[100px] shrink-0 rounded-lg" />
        </div>

        {/* Responsive component card grid */}
        <div
          aria-hidden="true"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skeletonCards.map((index) => (
            <article key={index} className="relative min-w-0 rounded-xl">
              {/* Video preview placeholder */}
              <div className="skeleton-shimmer aspect-video w-full rounded-md" />

              {/* Title, description, and tags */}
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <div className="skeleton-shimmer h-4 w-2/3 rounded-sm" />

                  {/* Description lines */}
                  <div className="mt-2 space-y-1.5">
                    <div className="skeleton-shimmer h-3 w-full rounded-sm" />
                    <div className="skeleton-shimmer h-3 w-4/5 rounded-sm" />
                  </div>
                </div>

                {/* Tag and remaining-tag count */}
                <div className="flex shrink-0 items-center gap-1">
                  <div className="skeleton-shimmer h-5 w-12 rounded-sm" />
                  <div className="skeleton-shimmer h-5 w-7 rounded-sm" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}