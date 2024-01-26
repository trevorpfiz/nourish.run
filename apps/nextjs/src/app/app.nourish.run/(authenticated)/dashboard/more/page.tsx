import { auth, signOut } from "@nourish/auth";
import { Button } from "@nourish/ui/button";

import { Tabs } from "~/components/dashboard/tabs";

export const runtime = "edge";

export default async function MorePage() {
  const session = await auth();

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden bg-white">
      <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white">
        <main className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto overflow-x-hidden px-4 pb-32">
          <p>{session?.user.name}</p>
          <form>
            <Button
              size="lg"
              formAction={async () => {
                "use server";
                await signOut();
              }}
            >
              Sign out
            </Button>
          </form>
        </main>

        {/* Tabs */}
        <Tabs />
      </div>
    </div>
  );
}
