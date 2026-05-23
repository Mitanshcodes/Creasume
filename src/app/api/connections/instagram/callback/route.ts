import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/encryption";
import {
  exchangeCodeForToken,
  getLongLivedToken,
  getInstagramProfile,
  getInstagramMedia,
} from "@/lib/instagram";

export async function GET(req: NextRequest) {
  const base = process.env.NEXTAUTH_URL!;
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(`${base}/dashboard/connections?error=instagram_denied`);
  }

  const session = await auth();
  if (!session?.user?.creatorId) {
    return NextResponse.redirect(`${base}/login`);
  }

  try {
    // Short-lived token + Instagram user ID
    const { access_token: shortToken, user_id } = await exchangeCodeForToken(code);

    // Long-lived token (valid 60 days)
    const { access_token: longToken, expires_in } = await getLongLivedToken(shortToken);

    // Fetch profile and recent media in parallel
    const [profile, media] = await Promise.all([
      getInstagramProfile(longToken),
      getInstagramMedia(longToken),
    ]);

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    // Store encrypted token in SocialAccount
    await db.socialAccount.upsert({
      where: {
        creatorId_platform: {
          creatorId: session.user.creatorId,
          platform: "INSTAGRAM",
        },
      },
      update: {
        platformUserId: String(user_id),
        handle: profile.username,
        accessTokenEnc: encrypt(longToken),
        tokenExpiresAt: expiresAt,
        lastSyncedAt: new Date(),
        scope: "instagram_business_basic,instagram_manage_comments,instagram_business_manage_messages",
      },
      create: {
        creatorId: session.user.creatorId,
        platform: "INSTAGRAM",
        platformUserId: String(user_id),
        handle: profile.username,
        accessTokenEnc: encrypt(longToken),
        tokenExpiresAt: expiresAt,
        lastSyncedAt: new Date(),
        scope: "instagram_business_basic,instagram_manage_comments,instagram_business_manage_messages",
      },
    });

    // Calculate engagement metrics from recent media
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

    // Create new analytics snapshot
    await db.analyticsSnapshot.create({
      data: {
        creatorId: session.user.creatorId,
        platform: "INSTAGRAM",
        followers: profile.followers_count,
        totalPosts: profile.media_count,
        avgLikes,
        avgComments,
        engagementRate,
        topContentJson,
      },
    });

    return NextResponse.redirect(`${base}/dashboard/connections?success=instagram`);
  } catch (err) {
    console.error("[Instagram callback]", err);
    return NextResponse.redirect(`${base}/dashboard/connections?error=instagram_failed`);
  }
}
