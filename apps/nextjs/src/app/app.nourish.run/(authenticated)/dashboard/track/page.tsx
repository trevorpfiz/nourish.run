import { ModalTopBar } from "~/components/track/modal-top-bar";
import { ReviewDrawerDialog } from "~/components/track/review-drawer";
import SearchFoods from "~/components/track/search-foods";
import SearchResults from "~/components/track/search-results";

export const runtime = "edge";

// FIXME: idk if I can use min-h-screen here
export default async function TrackPage() {
  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <div
        vaul-drawer-wrapper=""
        className="relative flex h-dvh w-full max-w-2xl flex-col overflow-hidden bg-white pb-4"
      >
        {/* TopNavbar */}
        <ModalTopBar />

        {/* Search bar */}
        <SearchFoods />

        {/* Content */}
        <main className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto overflow-x-hidden px-4 pb-12 pt-4">
          {/* Search results */}
          <SearchResults />
        </main>

        {/* Review button */}
        {/* <ReviewButton /> */}

        {/* Review button and drawer / dialog */}
        {/* <ReviewDrawerDialog /> */}

        <div className="flex-shrink-0 px-4">
          <ReviewDrawerDialog />
        </div>
      </div>
    </div>
  );
}
