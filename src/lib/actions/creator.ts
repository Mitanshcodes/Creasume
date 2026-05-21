"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getCreatorId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.creatorId) throw new Error("Unauthorized");
  return session.user.creatorId;
}

export type UpdateProfileData = {
  displayName: string;
  headline?: string;
  bio?: string;
  location?: string;
  niches: string[];
  contactEmail?: string;
  websiteUrl?: string;
  isPublished?: boolean;
};

export async function updateProfile(data: UpdateProfileData) {
  const creatorId = await getCreatorId();

  await db.creator.update({
    where: { id: creatorId },
    data: {
      displayName: data.displayName,
      headline: data.headline || null,
      bio: data.bio || null,
      location: data.location || null,
      niches: data.niches,
      contactEmail: data.contactEmail || null,
      websiteUrl: data.websiteUrl || null,
    },
  });

  revalidatePath("/dashboard/edit");
  revalidatePath("/dashboard");
}

export async function updateDesign(data: {
  accentColor: string;
  backgroundStyle: string;
  fontPairing: string;
}) {
  const creatorId = await getCreatorId();

  await db.creator.update({
    where: { id: creatorId },
    data: {
      accentColor: data.accentColor,
      backgroundStyle: data.backgroundStyle,
      fontPairing: data.fontPairing,
    },
  });

  revalidatePath("/dashboard/edit");
}

export async function togglePublished(isPublished: boolean) {
  const creatorId = await getCreatorId();

  const creator = await db.creator.update({
    where: { id: creatorId },
    data: { isPublished },
    select: { username: true },
  });

  revalidatePath(`/${creator.username}`);
  revalidatePath("/dashboard");
}

export async function updateEmail(newEmail: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const existing = await db.user.findUnique({ where: { email: newEmail } });
  if (existing && existing.id !== session.user.id) {
    return { error: "Email already in use" };
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { email: newEmail },
  });

  return { success: true };
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const bcrypt = await import("bcryptjs");
  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user?.password) return { error: "No password set on this account" };

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return { error: "Current password is incorrect" };

  const hashed = await bcrypt.hash(newPassword, 12);
  await db.user.update({ where: { id: session.user.id }, data: { password: hashed } });

  return { success: true };
}
