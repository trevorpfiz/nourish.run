import { FcGoogle } from "react-icons/fc";

import { signIn } from "@nourish/auth";
import { Button } from "@nourish/ui/button";

export const Social = () => {
  return (
    <form className="flex w-full items-center gap-2">
      <Button
        size="lg"
        className="flex w-full flex-row items-center justify-center gap-2"
        variant="outline"
        formAction={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
        <span className="font-medium text-gray-700">Continue with Google</span>
      </Button>
    </form>
  );
};
