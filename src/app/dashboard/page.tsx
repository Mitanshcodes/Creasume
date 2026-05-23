import Link from "next/link";
import { redirect } from "next/navigation";
import { RefreshCw, ExternalLink, Copy, Users, Eye, Image, TrendingUp, MessageSquare } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import { InstagramIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.creatorId) redirect("/login");

  const creator = await db.creator.findUnique({
    where: { id: session.user.creatorId },
    include: {
      socialAccounts: true,
      analyticsSnapshots: {
        orderBy: { capturedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!creator) redirect("/login");

  const latestSnap = creator.analyticsSnapshots[0];
  const igAccount = creator.socialAccounts.find((a) => a.platform === "INSTAGRAM");
  const ytAccount = creator.socialAccounts.find((a) => a.platform === "YOUTUBE");

  const followers = latestSnap?.followers ?? 0;
  const engagementRate = latestSnap?.engagementRate ?? 0;
  const totalPosts = latestSnap?.totalPosts ?? 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Welcome back, {creator.displayName} 👋
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Here&apos;s what&apos;s happening with your creator business today.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm px-4 py-2 rounded-xl transition-colors">
            <RefreshCw className="h-4 w-4" />
            Refresh Stats
          </button>
          <Link
            href={`/${creator.username}`}
            className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm px-4 py-2 rounded-xl transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Profile
          </Link>
        </div>
      </div>

      {/* Influence Card Link */}
      <div className="card-dark p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-white font-medium text-sm">Your Influence Card Link</p>
          <p className="text-white/40 text-xs mt-0.5">
            Share this with brands instead of a PDF media kit.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-black/40 border border-[#10b981]/20 rounded-xl px-4 py-2">
          <span className="text-[#10b981] text-sm font-mono">
            creasume.com/{creator.username}
          </span>
          <button className="text-white/40 hover:text-white transition-colors ml-1" title="Copy link">
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard
          label="Followers"
          value={followers}
          caption="Total Audience"
          icon={<Users className="h-4 w-4 text-white/40" />}
        />
        <StatCard
          label="Profile Views"
          value={0}
          caption="Coming soon"
          icon={<Eye className="h-4 w-4 text-white/40" />}
        />
        <StatCard
          label="Media Count"
          value={totalPosts}
          caption="Total Posts"
          icon={<Image className="h-4 w-4 text-white/40" />}
        />
        <StatCard
          label="Avg. Engagement"
          value={engagementRate > 0 ? `${engagementRate.toFixed(2)}%` : "—"}
          caption="Engagement Rate"
          icon={<TrendingUp className="h-4 w-4 text-white/40" />}
          isRaw
        />
        <StatCard
          label="Brand Inquiries"
          value={0}
          caption="Total Received"
          icon={<MessageSquare className="h-4 w-4 text-white/40" />}
        />
      </div>

      {/* Two-col: Recent posts + Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Posts placeholder */}
        <div className="lg:col-span-2 card-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Instagram Posts</h2>
            <button className="text-[#10b981] text-xs hover:opacity-80 transition-opacity">View All</button>
          </div>
          {igAccount ? (
            <p className="text-white/40 text-sm">
              Connect Instagram and sync to see recent posts here.
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 gap-3">
              <p className="text-white/30 text-sm text-center">
                Connect your Instagram account to see recent posts
              </p>
              <Link
                href="/dashboard/connections"
                className="brand-gradient text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                Connect Instagram
              </Link>
            </div>
          )}
        </div>

        {/* Platforms */}
        <div className="card-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Platforms</h2>
            <Link href="/dashboard/connections" className="text-[#10b981] text-xs hover:opacity-80 transition-opacity">
              Manage
            </Link>
          </div>

          {igAccount ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                <InstagramIcon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">Instagram</p>
                <p className="text-white/40 text-xs truncate">{igAccount.handle}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white text-sm font-semibold">{totalPosts}</p>
                <p className="text-[#10b981] text-xs">Connected</p>
              </div>
            </div>
          ) : (
            <Link
              href="/dashboard/connections"
              className="flex items-center justify-center gap-2 w-full border border-white/[0.06] rounded-xl py-3 text-sm text-white/50 hover:text-white hover:border-white/[0.12] transition-colors mb-2"
            >
              <InstagramIcon className="h-4 w-4" />
              + Connect Instagram
            </Link>
          )}

          {ytAccount ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
                <YoutubeIcon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">YouTube</p>
                <p className="text-white/40 text-xs truncate">{ytAccount.handle}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[#10b981] text-xs">Connected</p>
              </div>
            </div>
          ) : (
            <Link
              href="/dashboard/connections"
              className="flex items-center justify-center gap-2 w-full border border-white/[0.06] rounded-xl py-3 text-sm text-white/50 hover:text-white hover:border-white/[0.12] transition-colors mb-2"
            >
              <YoutubeIcon className="h-4 w-4" />
              + Connect YouTube
            </Link>
          )}

          <Link
            href="/dashboard/connections"
            className="flex items-center justify-center gap-2 w-full border border-white/[0.06] rounded-xl py-3 text-sm text-white/50 hover:text-white hover:border-white/[0.12] transition-colors"
          >
            <TikTokIcon className="h-4 w-4" />
            + TikTok (coming soon)
          </Link>
        </div>
      </div>
    </div>
  );
}
