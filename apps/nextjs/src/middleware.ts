import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@nourish/auth";

import { env } from "~/env";
import { authRoutes } from "~/routes";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const session = await auth();
  const isLoggedIn = !!session?.user;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    .replace(".local.run:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  console.log(hostname, path, url, req.url);

  // Handle app subdomain
  if (hostname == `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.log(isLoggedIn, hostname, req.url, "apppppppppp");
    // if (!isLoggedIn) {
    //   return NextResponse.redirect(new URL("/signin", req.url));
    // }
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  // Handle main domain
  if (
    hostname === "localhost:3000" ||
    hostname === "local.run:3000" ||
    hostname.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) // e.g. www.domain.com
  ) {
    console.log(isLoggedIn, hostname, req.url, "mainnnnnnn");

    const isDevelopment = process.env.NODE_ENV === "development";
    const baseUrl = isDevelopment
      ? `http://app.${hostname}`
      : `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    if (isLoggedIn && authRoutes.includes(path)) {
      return NextResponse.redirect(new URL(baseUrl));
    }

    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // Allow normal processing for all other requests
  return NextResponse.next();
}
