import { auth, signOut } from "@nourish/auth";
import { Button } from "@nourish/ui/button";

export const runtime = "edge";

export default async function MorePage() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
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
    </div>
  );
}
