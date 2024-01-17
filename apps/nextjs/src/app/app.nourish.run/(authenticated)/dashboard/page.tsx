import { AuthShowcase } from "~/app/_components/auth-showcase";
import { Tabs } from "~/components/dashboard/tabs";
import { TopNavbar } from "~/components/dashboard/top-navbar";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <div className="relative flex h-full max-w-2xl flex-1 flex-col overflow-hidden">
        {/* TopNavbar */}
        <TopNavbar />

        {/* Content */}
        <main className="relative h-full w-full flex-1 overflow-auto">
          <AuthShowcase />
        </main>

        {/* Tabs */}
        <Tabs />
      </div>
    </div>
  );
}
