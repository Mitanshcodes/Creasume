import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import ConnectionsClient from "@/components/dashboard/connections-client";

export const metadata: Metadata = { title: "Connections" };

export default async function ConnectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.creatorId) redirect("/login");

  const { success, error } = await searchParams;

  const accounts = await db.socialAccount.findMany({
    where: { creatorId: session.user.creatorId },
    select: {
      platform: true,
      handle: true,
      lastSyncedAt: true,
    },
  });

  const igAccount = accounts.find((a) => a.platform === "INSTAGRAM") ?? null;
  const ytAccount = accounts.find((a) => a.platform === "YOUTUBE") ?? null;

  return (
    <ConnectionsClient
      igAccount={igAccount ? { handle: igAccount.handle, lastSyncedAt: igAccount.lastSyncedAt } : null}
      ytAccount={ytAccount ? { handle: ytAccount.handle, lastSyncedAt: ytAccount.lastSyncedAt } : null}
      successParam={success}
      errorParam={error}
    />
  );
}
