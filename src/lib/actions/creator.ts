"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { Platform } from "@/generated/prisma";

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

// ─── Campaigns ──────────────────────────────────────────────────────────────

export type CampaignData = {
  brandName: string;
  title: string;
  description?: string;
  platform?: "INSTAGRAM" | "YOUTUBE" | "";
  metrics?: Record<string, number>;
  thumbnailUrl?: string;
  contentUrl?: string;
  startedAt?: string;
  endedAt?: string;
  isFeatured?: boolean;
};

export async function addCampaign(data: CampaignData) {
  const creatorId = await getCreatorId();

  const agg = await db.campaign.aggregate({ where: { creatorId }, _max: { order: true } });

  await db.campaign.create({
    data: {
      creatorId,
      brandName: data.brandName,
      title: data.title,
      description: data.description || null,
      platform: data.platform ? (data.platform as Platform) : null,
      metricsJson: data.metrics ?? undefined,
      thumbnailUrl: data.thumbnailUrl || null,
      contentUrl: data.contentUrl || null,
      startedAt: data.startedAt ? new Date(data.startedAt) : null,
      endedAt: data.endedAt ? new Date(data.endedAt) : null,
      isFeatured: data.isFeatured ?? false,
      order: (agg._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/dashboard/edit");
}

export async function updateCampaign(id: string, data: CampaignData) {
  const creatorId = await getCreatorId();

  await db.campaign.update({
    where: { id, creatorId },
    data: {
      brandName: data.brandName,
      title: data.title,
      description: data.description || null,
      platform: data.platform ? (data.platform as Platform) : null,
      metricsJson: data.metrics ?? undefined,
      thumbnailUrl: data.thumbnailUrl || null,
      contentUrl: data.contentUrl || null,
      startedAt: data.startedAt ? new Date(data.startedAt) : null,
      endedAt: data.endedAt ? new Date(data.endedAt) : null,
      isFeatured: data.isFeatured ?? false,
    },
  });

  revalidatePath("/dashboard/edit");
}

export async function deleteCampaign(id: string) {
  const creatorId = await getCreatorId();
  await db.campaign.delete({ where: { id, creatorId } });
  revalidatePath("/dashboard/edit");
}

export async function toggleCampaignFeatured(id: string, isFeatured: boolean) {
  const creatorId = await getCreatorId();
  await db.campaign.update({ where: { id, creatorId }, data: { isFeatured } });
  revalidatePath("/dashboard/edit");
}

export async function reorderCampaigns(orderedIds: string[]) {
  const creatorId = await getCreatorId();
  await db.$transaction(
    orderedIds.map((id, index) =>
      db.campaign.update({ where: { id, creatorId }, data: { order: index } })
    )
  );
  revalidatePath("/dashboard/edit");
}

// ─── Packages ───────────────────────────────────────────────────────────────

export type PackageData = {
  name: string;
  description?: string;
  priceCents: number;
  deliverables: string[];
};

export async function addPackage(data: PackageData) {
  const creatorId = await getCreatorId();

  const agg = await db.package.aggregate({ where: { creatorId }, _max: { order: true } });

  await db.package.create({
    data: {
      creatorId,
      name: data.name,
      description: data.description || null,
      priceCents: data.priceCents,
      deliverables: data.deliverables,
      order: (agg._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/dashboard/edit");
}

export async function updatePackage(id: string, data: PackageData) {
  const creatorId = await getCreatorId();

  await db.package.update({
    where: { id, creatorId },
    data: {
      name: data.name,
      description: data.description || null,
      priceCents: data.priceCents,
      deliverables: data.deliverables,
    },
  });

  revalidatePath("/dashboard/edit");
}

export async function deletePackage(id: string) {
  const creatorId = await getCreatorId();
  await db.package.delete({ where: { id, creatorId } });
  revalidatePath("/dashboard/edit");
}

// ─── Instagram sync ──────────────────────────────────────────────────────────

export async function syncInstagram() {
  const creatorId = await getCreatorId();

  const account = await db.socialAccount.findUnique({
    where: { creatorId_platform: { creatorId, platform: "INSTAGRAM" } },
  });
  if (!account) return { error: "Instagram not connected" };

  const { decrypt } = await import("@/lib/encryption");
  const { getInstagramProfile, getInstagramMedia, refreshLongLivedToken } = await import(
    "@/lib/instagram"
  );

  let token = decrypt(account.accessTokenEnc);

  // Refresh token if expiring within 7 days
  if (account.tokenExpiresAt && account.tokenExpiresAt.getTime() - Date.now() < 7 * 86400 * 1000) {
    const refreshed = await refreshLongLivedToken(token);
    token = refreshed.access_token;
    const { encrypt } = await import("@/lib/encryption");
    await db.socialAccount.update({
      where: { creatorId_platform: { creatorId, platform: "INSTAGRAM" } },
      data: {
        accessTokenEnc: encrypt(token),
        tokenExpiresAt: new Date(Date.now() + refreshed.expires_in * 1000),
      },
    });
  }

  const [profile, media] = await Promise.all([
    getInstagramProfile(token),
    getInstagramMedia(token),
  ]);

  await db.socialAccount.update({
    where: { creatorId_platform: { creatorId, platform: "INSTAGRAM" } },
    data: { handle: profile.username, lastSyncedAt: new Date() },
  });

  const posts = media.filter((m) => m.like_count !== undefined || m.comments_count !== undefined);
  const avgLikes =
    posts.length > 0
      ? Math.round(posts.reduce((s, m) => s + (m.like_count ?? 0), 0) / posts.length)
      : null;
  const avgComments =
    posts.length > 0
      ? Math.round(posts.reduce((s, m) => s + (m.comments_count ?? 0), 0) / posts.length)
      : null;
  const engagementRate =
    profile.followers_count > 0 && avgLikes !== null && avgComments !== null
      ? (avgLikes + avgComments) / profile.followers_count
      : null;

  const topContentJson = media.slice(0, 3).map((m) => ({
    url: m.permalink,
    thumbnail: m.media_url ?? m.thumbnail_url ?? null,
    likes: m.like_count ?? 0,
    comments: m.comments_count ?? 0,
    caption: m.caption ?? "",
  }));

  await db.analyticsSnapshot.create({
    data: {
      creatorId,
      platform: "INSTAGRAM",
      followers: profile.followers_count,
      totalPosts: profile.media_count,
      avgLikes,
      avgComments,
      engagementRate,
      topContentJson,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/connections");
  revalidatePath(`/${(await db.creator.findUnique({ where: { id: creatorId }, select: { username: true } }))?.username}`);

  return { success: true };
}

export async function disconnectInstagram() {
  const creatorId = await getCreatorId();
  await db.socialAccount.delete({
    where: { creatorId_platform: { creatorId, platform: "INSTAGRAM" } },
  });
  revalidatePath("/dashboard/connections");
  revalidatePath("/dashboard");
}

export async function reorderPackages(orderedIds: string[]) {
  const creatorId = await getCreatorId();
  await db.$transaction(
    orderedIds.map((id, index) =>
      db.package.update({ where: { id, creatorId }, data: { order: index } })
    )
  );
  revalidatePath("/dashboard/edit");
}
