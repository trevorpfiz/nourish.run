import { Card, CardContent, CardFooter, CardHeader } from "@nourish/ui/card";

import { Header } from "~/app/(authenticated)/(app)/(auth)/_components/header";
import { Social } from "~/app/(authenticated)/(app)/(auth)/_components/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = true,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Social />
      </CardFooter>
    </Card>
  );
};
