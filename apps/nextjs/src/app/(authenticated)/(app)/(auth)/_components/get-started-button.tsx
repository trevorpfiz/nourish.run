"use client";

import { useRouter } from "next/navigation";

interface GetStartedButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const GetStartedButton = ({
  children,
  mode = "redirect",
  asChild,
}: GetStartedButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/sign-up");
  };

  if (mode === "modal") {
    return <span>TODO: Implement Modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
