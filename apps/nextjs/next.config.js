import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

// Importing env files here to validate on build
import "./src/env.js";
import "@nourish/auth/env";

export default (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  let nextConfig = {
    reactStrictMode: true,
    /** Enables hot reloading for local packages without a build step */
    transpilePackages: [
      "@nourish/api",
      "@nourish/auth",
      "@nourish/db",
      "@nourish/ui",
      "@nourish/validators",
    ],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
      ],
    },
    /** We already do linting and typechecking as separate tasks in CI */
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
  };

  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   nextConfig = {
  //     ...nextConfig,
  //     // @link https://github.com/pmndrs/swc-jotai/issues/21
  //     // @link https://nextjs.org/docs/messages/fast-refresh-reload
  //     experimental: {
  //       swcPlugins: [
  //         ["@swc-jotai/debug-label", {}],
  //         ["@swc-jotai/react-refresh", {}],
  //       ],
  //     },
  //   };
  // }

  return nextConfig;
};
