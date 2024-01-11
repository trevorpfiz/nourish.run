import { Card, CardContent, CardFooter, CardHeader } from "@nourish/ui/card";

import { BackButton } from "~/app/(authenticated)/(app)/(auth)/_components/back-button";
import { Header } from "~/app/(authenticated)/(app)/(auth)/_components/header";
import { Social } from "~/app/(authenticated)/(app)/(auth)/_components/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonLinkLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonLinkLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] p-4 shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      {showSocial && (
        <CardFooter className="pb-0">
          <Social />
        </CardFooter>
      )}

      <div className="mb-4 mt-6 flex items-center justify-center px-6">
        <div className="mr-3 flex-grow border-t border-gray-300" />
        <span className="text-gray-500">or</span>
        <div className="ml-3 flex-grow border-t border-gray-300" />
      </div>

      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          linkLabel={backButtonLinkLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
