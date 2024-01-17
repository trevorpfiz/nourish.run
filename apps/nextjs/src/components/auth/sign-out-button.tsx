import { signOut } from "@nourish/auth";
import { Button } from "@nourish/ui/button";

interface SignOutButtonProps {
  children?: React.ReactNode;
}

export const SignOutButton = ({ children }: SignOutButtonProps) => {
  return (
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
  );
};
