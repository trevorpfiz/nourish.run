import { env } from "~/env";

export const HOME_DOMAIN = `https://${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

export const APP_HOSTNAMES = new Set([
  `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  `preview.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
      : "http://localhost:3000";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
      : process.env.NGROK_URL ?? "http://localhost:3000";
