import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import SettingsClient from "@/components/dashboard/settings-client";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, password: true },
  });

  const creator = session.user.creatorId
    ? await db.creator.findUnique({
        where: { id: session.user.creatorId },
        select: { isPublished: true },
      })
    : null;

  return (
    <SettingsClient
      email={user?.email ?? ""}
      hasPassword={!!user?.password}
      isPublished={creator?.isPublished ?? false}
    />
  );
}
