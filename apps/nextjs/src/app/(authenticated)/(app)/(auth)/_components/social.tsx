import { FcGoogle } from "react-icons/fc";

import { signIn } from "@nourish/auth";
import { Button } from "@nourish/ui/button";

export const Social = () => {
  return (
    <div className="flex w-full items-center gap-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        formAction={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
