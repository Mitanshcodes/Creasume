"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

const RESERVED_USERNAMES = [
  "admin", "api", "dashboard", "login", "signup", "www", "creasume",
  "about", "help", "support", "terms", "privacy", "demo", "settings",
];

export type AuthResult = { error: string } | { success: true };

export async function signUpAction(formData: FormData): Promise<AuthResult> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !username || !password) {
    return { error: "All fields are required" };
  }
  if (!/^[a-z0-9_-]{3,30}$/.test(username)) {
    return { error: "Username must be 3–30 chars: lowercase letters, numbers, hyphens, underscores only" };
  }
  if (RESERVED_USERNAMES.includes(username)) {
    return { error: "That username is reserved" };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  const [existingUser, existingCreator] = await Promise.all([
    db.user.findUnique({ where: { email } }),
    db.creator.findUnique({ where: { username } }),
  ]);
  if (existingUser) return { error: "Email already registered" };
  if (existingCreator) return { error: "Username already taken" };

  const hashed = await bcrypt.hash(password, 12);

  await db.user.create({
    data: {
      email,
      name,
      password: hashed,
      creator: {
        create: {
          username,
          displayName: name,
          niches: [],
          isPublished: false,
          accentColor: "#a855f7",
          backgroundStyle: "MESH_GRADIENT",
          fontPairing: "SYNE_SPACE_GROTESK",
        },
      },
    },
  });

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: "Account created but login failed. Please log in manually." };
    }
    throw e;
  }

  return { success: true };
}

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email and password are required" };

  try {
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw e;
  }
}
