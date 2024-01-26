import { Suspense } from "react";

import { ModalTopBar } from "~/components/track/modal-top-bar";
import { PageContent } from "~/components/track/page-content";
import SearchFoods from "~/components/track/search-foods";
import { LoaderComponent } from "~/components/ui/loader";
import { api } from "~/trpc/server";

export const runtime = "edge";
// export const revalidate = 3600; // revalidate at most every hour
export const revalidate = 86400; // revalidate at most every day

// TODO: keep an eye on h-dvh
export default async function TrackPage() {
  const foodItems = api.foodItem.all();

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <div
        vaul-drawer-wrapper=""
        className="relative flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-white pb-4"
      >
        {/* TopNavbar */}
        <ModalTopBar />

        <Suspense fallback={<LoaderComponent />}>
          {/* Search bar */}
          <SearchFoods foodItems={foodItems} />

          {/* Content and Review drawer */}
          <PageContent />
        </Suspense>
      </div>
    </div>
  );
}
