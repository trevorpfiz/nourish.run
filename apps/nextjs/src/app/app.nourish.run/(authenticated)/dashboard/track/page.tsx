import { ModalTopBar } from "~/components/track/modal-top-bar";
import { PageContent } from "~/components/track/page-content";
import SearchFoods from "~/components/track/search-foods";

export const runtime = "edge";

// TODO: keep an eye on h-dvh
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

        {/* Content and Review drawer */}
        <PageContent />
      </div>
    </div>
  );
}
