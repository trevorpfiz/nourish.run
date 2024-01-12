/**
 * Represents an array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]} publicRoutes - The public routes.
 */
export const publicRoutes = ["/"];

/**
 * Represents an array of routes that are used for authentication.
 * Logged in users will be redirected to DEFAULT_LOGIN_REDIRECT when accessing these routes.
 * @type {string[]} authRoutes - The authentication routes.
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * The prefix used for API authentication routes.
 * Routes starting with this prefix are utilized for API authentication purposes.
 * @type {string} apiAuthPrefix - The API authentication prefix.
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default path to which users are redirected after logging in.
 * @type {string} DEFAULT_LOGIN_REDIRECT - The default login redirect path.
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
