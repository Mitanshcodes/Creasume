import { auth } from "@/lib/auth";
import { getInstagramAuthUrl } from "@/lib/instagram";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.creatorId) {
    return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
  }
  return NextResponse.redirect(getInstagramAuthUrl());
}
