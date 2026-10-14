// import { MOCK_CATALOG_ITEMS } from "@/data/mock-catalog";
// import DisplayCard from "./display-card";

// export default function UILibraryPage() {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto">
//         {/* Grid Container */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {MOCK_CATALOG_ITEMS.map((catalogItem) => {
//             const [firstTag, ...restTags] = catalogItem.tags;
            
//             return (
//               <DisplayCard
//                 key={catalogItem.id}
//                 href={catalogItem.href}
//                 item={catalogItem.item}
//                 preview={catalogItem.preview}
//                 firstTag={firstTag}
//                 remainingCount={restTags.length}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import { MOCK_CATALOG_ITEMS } from "@/data/mock-catalog";
import DisplayCard from "./display-card";
import Filter from "./filter";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ComponentLibraryPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const activeFilter = resolvedSearchParams.category;

  // Extract all unique tags across all mock items for the filter bar
  const allTags = Array.from(
    new Set(MOCK_CATALOG_ITEMS.flatMap((item) => item.tags))
  );

  // Filter items based on the selected tag
  const filteredItems = activeFilter
    ? MOCK_CATALOG_ITEMS.filter((item) => item.tags.includes(activeFilter))
    : MOCK_CATALOG_ITEMS;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Tag Filter Bar */}
        <Filter
          category="tag"
          categoryHref="/ui"
          filters={allTags}
          activeFilter={activeFilter}
        />

        {/* Filtered Display Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((catalogItem) => {
            const [firstTag, ...restTags] = catalogItem.tags;

            return (
              <DisplayCard
                key={catalogItem.id}
                href={catalogItem.href}
                item={catalogItem.item}
                preview={catalogItem.preview}
                firstTag={firstTag}
                remainingCount={restTags.length}
              />
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No components found for tag &quot;{activeFilter}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}