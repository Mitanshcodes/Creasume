export const RESERVED_USERNAMES = new Set([
  "api",
  "dashboard",
  "login",
  "signup",
  "admin",
  "settings",
  "username",
  "about",
  "help",
  "support",
  "terms",
  "privacy",
  "blog",
  "careers",
  "contact",
  "home",
  "explore",
  "discover",
  "search",
  "notifications",
  "messages",
  "profile",
  "account",
  "security",
  "billing",
  "pricing",
  "demo",
  "null",
  "undefined",
  "true",
  "false",
]);

export function isReservedUsername(username: string): boolean {
  return RESERVED_USERNAMES.has(username.toLowerCase());
}

export const USERNAME_REGEX = /^[a-z0-9-]{3,30}$/;

export function validateUsername(username: string): string | null {
  if (!USERNAME_REGEX.test(username)) {
    return "Username must be 3–30 characters: lowercase letters, numbers, and hyphens only";
  }
  if (isReservedUsername(username)) {
    return "That username is reserved";
  }
  return null;
}
