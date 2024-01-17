/**
 * Represents an array of routes that require authentication.
 * Users must be logged in to access these routes.
 * @type {string[]} protectedRoutes - The protected routes.
 */
export const protectedRoutes = ["/onboarding", "/dashboard"];

/**
 * Represents an array of routes used for authentication.
 * Logged in users will be redirected to DEFAULT_LOGIN_REDIRECT when accessing these routes.
 * @type {string[]} authRoutes - The authentication routes.
 */
export const authRoutes = ["/auth/signin", "/auth/signup"];

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
