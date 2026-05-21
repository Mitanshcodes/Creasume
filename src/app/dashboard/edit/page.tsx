import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import EditProfileClient from "@/components/dashboard/edit-profile-client";

export default async function EditProfilePage() {
  const session = await auth();
  if (!session?.user?.creatorId) redirect("/login");

  const creator = await db.creator.findUnique({
    where: { id: session.user.creatorId },
    include: {
      analyticsSnapshots: {
        orderBy: { capturedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!creator) redirect("/login");

  const snap = creator.analyticsSnapshots[0];

  return (
    <EditProfileClient
      initialProfile={{
        displayName: creator.displayName,
        username: creator.username,
        headline: creator.headline ?? "",
        bio: creator.bio ?? "",
        location: creator.location ?? "",
        niches: creator.niches,
        contactEmail: creator.contactEmail ?? "",
        websiteUrl: creator.websiteUrl ?? "",
        avatarUrl: creator.avatarUrl ?? null,
      }}
      initialDesign={{
        accentColor: creator.accentColor ?? "#a855f7",
        bgStyle: creator.backgroundStyle ?? "MESH_GRADIENT",
        fontPair: creator.fontPairing ?? "SYNE_SPACE_GROTESK",
      }}
      analytics={{
        followers: snap?.followers ?? 0,
        engagementRate: snap?.engagementRate ?? 0,
        avgViews: snap?.avgViews ?? 0,
      }}
    />
  );
}
