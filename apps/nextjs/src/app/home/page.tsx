import Link from "next/link";

import { Button } from "@nourish/ui/button";

import { GetStartedButton } from "~/components/auth/get-started-button";

export default function HomePage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Nourish
        </h1>
        <GetStartedButton>
          <Button>Get Started</Button>
        </GetStartedButton>
        <Link href="/blog">Blog</Link>
      </div>
    </main>
  );
}
