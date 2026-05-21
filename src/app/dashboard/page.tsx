import Link from "next/link";
import { RefreshCw, ExternalLink, Copy, Users, Eye, Image, TrendingUp, MessageSquare } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import { InstagramIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/brand-icons";

const MOCK_USERNAME = "sample.creator";

const MOCK_POSTS = [
  { id: 1, thumbnail: "https://picsum.photos/seed/post1/300/300", caption: "Morning routine ✨" },
  { id: 2, thumbnail: "https://picsum.photos/seed/post2/300/300", caption: "Mindful living 🌿" },
  { id: 3, thumbnail: "https://picsum.photos/seed/post3/300/300", caption: "Brand collab 🤍" },
  { id: 4, thumbnail: "https://picsum.photos/seed/post4/300/300", caption: "City life 🏙️" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
            Welcome back, {MOCK_USERNAME} 👋{" "}
            <span className="text-[#10b981] text-lg">🛡️</span>
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
            href={`/${MOCK_USERNAME}`}
            className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm px-4 py-2 rounded-xl transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Profile
          </Link>
        </div>
      </div>

      {/* Influence Card Link */}
      <div className="card-dark p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-medium text-sm">Your Influence Card Link</p>
          <p className="text-white/40 text-xs mt-0.5">
            Share this with brands instead of a PDF media kit.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-black/40 border border-[#10b981]/20 rounded-xl px-4 py-2">
          <span className="text-[#10b981] text-sm font-mono">
            creasume.com/{MOCK_USERNAME}
          </span>
          <button className="text-white/40 hover:text-white transition-colors ml-1">
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard
          label="Followers"
          value={12500}
          caption="Total Audience"
          icon={Users}
        />
        <StatCard
          label="Profile Views"
          value={43270}
          caption="Total Views"
          icon={Eye}
        />
        <StatCard
          label="Media Count"
          value={142}
          caption="Total Posts"
          icon={Image}
        />
        <StatCard
          label="Avg. Engagement"
          value="34.62%"
          caption="Engagement Rate"
          icon={TrendingUp}
          isRaw
        />
        <StatCard
          label="Brand Inquiries"
          value={3}
          caption="Total Received"
          icon={MessageSquare}
        />
      </div>

      {/* Two-col: Recent posts + Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Instagram Posts */}
        <div className="lg:col-span-2 card-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Instagram Posts</h2>
            <button className="text-[#10b981] text-xs hover:opacity-80 transition-opacity">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {MOCK_POSTS.map((post) => (
              <div key={post.id} className="relative aspect-square rounded-xl overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.thumbnail}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-white text-xs truncate">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="card-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Platforms</h2>
            <Link href="/dashboard/connections" className="text-[#10b981] text-xs hover:opacity-80 transition-opacity">
              Manage
            </Link>
          </div>

          {/* Connected */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
              <InstagramIcon className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium">Instagram</p>
              <p className="text-white/40 text-xs truncate">@sample.creator</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white text-sm font-semibold">142</p>
              <p className="text-[#10b981] text-xs">Synced just now</p>
            </div>
          </div>

          {/* Connect TikTok */}
          <Link
            href="/dashboard/connections"
            className="flex items-center justify-center gap-2 w-full border border-white/[0.06] rounded-xl py-3 text-sm text-white/50 hover:text-white hover:border-white/[0.12] transition-colors mb-2"
          >
            <TikTokIcon className="h-4 w-4" />
            + Connect TikTok
          </Link>

          {/* Connect YouTube */}
          <Link
            href="/dashboard/connections"
            className="flex items-center justify-center gap-2 w-full border border-white/[0.06] rounded-xl py-3 text-sm text-white/50 hover:text-white hover:border-white/[0.12] transition-colors"
          >
            <YoutubeIcon className="h-4 w-4" />
            + Connect YouTube
          </Link>
        </div>
      </div>
    </div>
  );
}
