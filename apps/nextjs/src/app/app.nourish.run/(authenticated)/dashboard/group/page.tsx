import { Tabs } from "~/components/dashboard/tabs";

export const runtime = "edge";

export default async function GroupPage() {
  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden bg-white">
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white">
        <main className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto overflow-x-hidden px-4 pb-32">
          <div className="pt-32">
            <p>Coming soon!</p>
          </div>
        </main>

        {/* Tabs */}
        <Tabs />
      </div>
    </div>
  );
}
