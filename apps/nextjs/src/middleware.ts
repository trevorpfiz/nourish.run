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

// export const config = {
//   matcher: [
//     /*
//      * The matcher applies the middleware to specific paths based on the following criteria:
//      * 1. Exclude paths with a file extension (e.g., .jpg, .css, .js). This is done using the regex
//      *    pattern that filters out paths ending in a dot followed by word characters.
//      * 2. Exclude paths starting with /_next/, which are used internally by Next.js.
//      * 3. Include the root path ("/") explicitly.
//      * 4. Include paths starting with /api or /trpc, followed by any characters. This allows
//      *    the middleware to be applied to all API routes and any routes starting with /trpc.
//      */
//     "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"
//   ],
// };

export default auth((req) => {
  const url = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

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
    hostname.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) // e.g. www.nourish.run
  ) {
    console.log(isLoggedIn, hostname, req.url, "mainnnnnnn");

    const isDevelopment = process.env.NODE_ENV === "development";
    const baseUrl = isDevelopment
      ? "http://app.localhost:3000"
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
});
