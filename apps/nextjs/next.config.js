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
    // Extend webpack configuration to include VeliteWebpackPlugin
    webpack: (config, { isServer }) => {
      // Initialize VeliteWebpackPlugin with any specific options you might have
      // For demonstration, no options are passed
      config.plugins.push(new VeliteWebpackPlugin());

      // Return the modified configuration
      return config;
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

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs !!!
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tap("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      const { build } = await import("velite");
      await build(this.options); // start velite
    });
  }
}
