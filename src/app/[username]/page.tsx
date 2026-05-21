import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Globe, Mail, Download, CalendarDays, ExternalLink } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { formatCompact, formatPercent } from "@/lib/utils";

// ─── Demo data ─────────────────────────────────────────────────────────────

const DEMO_CREATOR = {
  username: "demo",
  displayName: "Demo Creator",
  headline: "Lifestyle & Wellness · Los Angeles, CA",
  bio: "Mindful living for the modern gen. Brand deals open 🤍 Living proof that you can build a beautiful, intentional life — and document every step of it.",
  avatarUrl: null,
  coverUrl: null,
  location: "Los Angeles, CA",
  niches: ["Lifestyle", "Wellness", "Travel", "Beauty"],
  contactEmail: "hello@democreator.co",
  websiteUrl: "https://democreator.co",
  instagramHandle: "@democreator",
  youtubeHandle: "@democreator",
  accentColor: "#a855f7",

  snapshots: {
    instagram: {
      platform: "INSTAGRAM" as const,
      followers: 125000,
      engagementRate: 0.042,
      avgLikes: 8900,
      avgComments: 310,
      totalPosts: 412,
      profileViews: 2500000,
      reach: 1800000,
      lastSyncedAt: new Date(Date.now() - 2 * 3600 * 1000),
      audienceJson: {
        genderSplit: { female: 0.68, male: 0.32 },
        ageBuckets: [
          { range: "18-24", pct: 0.32 },
          { range: "25-34", pct: 0.38 },
          { range: "35-44", pct: 0.18 },
          { range: "45+", pct: 0.12 },
        ],
        topCountries: [
          { name: "United States", pct: 0.58 },
          { name: "United Kingdom", pct: 0.1 },
          { name: "Canada", pct: 0.08 },
          { name: "Australia", pct: 0.05 },
        ],
        topCities: ["Los Angeles", "New York", "London", "Toronto", "Sydney"],
      },
      topContentJson: [
        { url: "https://instagram.com/p/demo1", thumbnail: "https://picsum.photos/seed/ic1/400/400", likes: 28400, comments: 820, caption: "Morning ritual 🌅" },
        { url: "https://instagram.com/p/demo2", thumbnail: "https://picsum.photos/seed/ic2/400/400", likes: 24100, comments: 612, caption: "Whole foods haul 🌿" },
        { url: "https://instagram.com/p/demo3", thumbnail: "https://picsum.photos/seed/ic3/400/400", likes: 19800, comments: 490, caption: "Skincare routine ✨" },
        { url: "https://instagram.com/p/demo4", thumbnail: "https://picsum.photos/seed/ic4/400/400", likes: 17200, comments: 380, caption: "Weekend reset 🏡" },
        { url: "https://instagram.com/p/demo5", thumbnail: "https://picsum.photos/seed/ic5/400/400", likes: 15600, comments: 290, caption: "Outfit of the day 🤍" },
        { url: "https://instagram.com/p/demo6", thumbnail: "https://picsum.photos/seed/ic6/400/400", likes: 14300, comments: 260, caption: "City exploration 🏙️" },
      ],
    },
    youtube: {
      platform: "YOUTUBE" as const,
      followers: 48000,
      engagementRate: 0.057,
      avgViews: 62000,
      avgLikes: 3800,
      avgComments: 290,
      totalPosts: 94,
      lastSyncedAt: new Date(Date.now() - 5 * 3600 * 1000),
      audienceJson: null,
      topContentJson: [
        { url: "https://youtube.com/watch?v=demo1", thumbnail: "https://picsum.photos/seed/yt1/480/270", views: 218000, likes: 9200, comments: 740, caption: "My Morning Routine for a Mindful Life" },
        { url: "https://youtube.com/watch?v=demo2", thumbnail: "https://picsum.photos/seed/yt2/480/270", views: 156000, likes: 6800, comments: 510, caption: "Whole Foods Week: What I Eat in a Day" },
        { url: "https://youtube.com/watch?v=demo3", thumbnail: "https://picsum.photos/seed/yt3/480/270", views: 108000, likes: 5100, comments: 390, caption: "LA Apartment Tour — Minimalist Edition" },
      ],
    },
  },

  campaigns: [
    {
      id: "c1",
      brandName: "Ritual",
      title: "Essential Protein Campaign",
      description: "8-week content series showcasing Ritual's protein line across Instagram and YouTube, reaching 1.2M people.",
      platform: "INSTAGRAM" as const,
      thumbnailUrl: "https://picsum.photos/seed/ritual/600/400",
      metricsJson: { reach: 1200000, impressions: 2100000, likes: 82000, comments: 3400 },
      isFeatured: true,
    },
    {
      id: "c2",
      brandName: "Glossier",
      title: "You Solid Perfume Launch",
      description: "Launch partnership for Glossier's new You Solid Perfume, featuring unboxing and GRWM content.",
      platform: "INSTAGRAM" as const,
      thumbnailUrl: "https://picsum.photos/seed/glossier/600/400",
      metricsJson: { reach: 380000, impressions: 590000, likes: 31000, comments: 1800 },
      isFeatured: true,
    },
    {
      id: "c3",
      brandName: "Lululemon",
      title: "WMTM Collection Feature",
      description: "Three-post campaign featuring the We Made Too Much collection with discount code integration.",
      platform: "INSTAGRAM" as const,
      thumbnailUrl: "https://picsum.photos/seed/lulu/600/400",
      metricsJson: { reach: 220000, impressions: 340000, clicks: 8400 },
      isFeatured: false,
    },
  ],

  packages: [
    {
      id: "p1",
      name: "Instagram Reel",
      description: "One cinematic reel with professional editing, voiceover, and branded content tags.",
      priceCents: 150000,
      currency: "USD",
      deliverables: ["1 × 30-60s Reel", "3 × Stories with swipe-up", "Full usage rights (30 days)", "7-day analytics report"],
    },
    {
      id: "p2",
      name: "Story Pack",
      description: "5-story sequence with product showcase, lifestyle integration, and swipe-up links.",
      priceCents: 60000,
      currency: "USD",
      deliverables: ["5 × Stories", "Link in bio for 48h", "Highlights placement", "Analytics report"],
    },
    {
      id: "p3",
      name: "Full Campaign",
      description: "End-to-end campaign across Instagram and YouTube with content strategy included.",
      priceCents: 500000,
      currency: "USD",
      deliverables: ["2 × Reels", "1 × YouTube integration (60-90s)", "10 × Stories", "Full usage rights (90 days)"],
    },
  ],

  wrappedMilestones: [
    { emoji: "📈", text: "+47K followers in 2025" },
    { emoji: "🤝", text: "12 brand collabs" },
    { emoji: "🌍", text: "Reached 2.5M people" },
    { emoji: "🎬", text: "94 YouTube videos" },
    { emoji: "💌", text: "3 brand inquiries this week" },
  ],
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function StatPill({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="px-3 py-2 rounded-xl text-center"
      style={{ background: color + "14", border: `1px solid ${color}28` }}
    >
      <p className="text-white font-bold text-sm">{value}</p>
      <p className="text-white/40 text-[10px]">{label}</p>
    </div>
  );
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  if (username !== "demo") return { title: "Not Found" };
  const c = DEMO_CREATOR;
  return {
    title: `${c.displayName} (@${c.username}) — Creasume`,
    description: c.bio,
    openGraph: {
      title: `${c.displayName} — Creasume Influence Card`,
      description: c.bio,
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function InfluenceCardPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  if (username !== "demo") notFound();

  const creator = DEMO_CREATOR;
  const { snapshots, accentColor } = creator;
  const accent = accentColor;

  return (
    <div className="min-h-screen bg-black">
      {/* Sticky mini nav */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-5 h-14 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
        <Link href="/" className="font-heading text-base font-bold text-white opacity-70 hover:opacity-100 transition-opacity">
          Creasume
        </Link>
        <Link
          href="/signup"
          className="brand-gradient text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Create your card →
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* ── Hero card ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          {/* Cover */}
          <div
            className="h-32 relative"
            style={{ background: `linear-gradient(135deg, ${accent}cc 0%, ${accent}44 60%, #000 100%)` }}
          >
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white border border-white/10">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Live
            </div>
          </div>

          <div className="px-6 pb-6 -mt-10 relative">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full border-4 border-black flex items-center justify-center text-2xl font-bold text-white mb-4"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)` }}
            >
              {creator.displayName.charAt(0)}
            </div>

            {/* Name + handle */}
            <h1 className="font-heading text-2xl font-bold text-white">{creator.displayName}</h1>
            <p className="text-white/40 text-sm font-mono mt-0.5">
              {creator.instagramHandle} · {creator.niches[0]} · {creator.location}
            </p>

            {/* Stat pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              <StatPill value={formatCompact(snapshots.instagram.followers)} label="Followers" color={accent} />
              <StatPill value={formatPercent(snapshots.instagram.engagementRate)} label="Eng. Rate" color="#ec4899" />
              <StatPill value={formatCompact(snapshots.instagram.profileViews ?? 0)} label="Total Views" color="#10b981" />
              <StatPill value={formatCompact(snapshots.instagram.reach ?? 0)} label="Total Reach" color="#f97316" />
            </div>

            {/* Niche chips */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {creator.niches.map((n) => (
                <span
                  key={n}
                  className="text-xs px-3 py-1 rounded-full border"
                  style={{ borderColor: accent + "40", color: accent, background: accent + "10" }}
                >
                  {n}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-lg">{creator.bio}</p>

            {/* Location */}
            <div className="flex items-center gap-1.5 mt-3 text-white/30 text-xs">
              <MapPin className="h-3 w-3" />
              {creator.location}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                style={{ background: accent }}
              >
                <CalendarDays className="h-4 w-4" />
                Book a Collab
              </button>
              <a
                href={`/api/pdf/${creator.username}`}
                className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <Download className="h-4 w-4" />
                Download Resume PDF
              </a>
              {creator.websiteUrl && (
                <a
                  href={creator.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Creator Wrapped ────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-hidden">
          <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-3">Creator Wrapped 2025</p>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
            {creator.wrappedMilestones.map(({ emoji, text }) => (
              <div
                key={text}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.03] text-sm text-white/70 whitespace-nowrap"
              >
                <span>{emoji}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Platforms ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-heading text-lg font-bold text-white mb-3">Connected Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Instagram */}
            <div className="card-dark p-5 border-pink-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <InstagramIcon className="h-4 w-4 text-pink-400" />
                  </div>
                  <span className="font-semibold text-white">Instagram</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  2h ago
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Followers", value: formatCompact(snapshots.instagram.followers) },
                  { label: "Engagement", value: formatPercent(snapshots.instagram.engagementRate) },
                  { label: "Avg Likes", value: formatCompact(snapshots.instagram.avgLikes ?? 0) },
                  { label: "Total Posts", value: String(snapshots.instagram.totalPosts) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                    <p className="text-white font-bold text-base">{value}</p>
                    <p className="text-white/40 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube */}
            <div className="card-dark p-5 border-red-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <YoutubeIcon className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="font-semibold text-white">YouTube</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  5h ago
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Subscribers", value: formatCompact(snapshots.youtube.followers) },
                  { label: "Engagement", value: formatPercent(snapshots.youtube.engagementRate ?? 0) },
                  { label: "Avg Views", value: formatCompact(snapshots.youtube.avgViews ?? 0) },
                  { label: "Total Videos", value: String(snapshots.youtube.totalPosts) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                    <p className="text-white font-bold text-base">{value}</p>
                    <p className="text-white/40 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Top Content ────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-heading text-lg font-bold text-white mb-3">Top Instagram Posts</h2>
          <div className="grid grid-cols-3 gap-2">
            {snapshots.instagram.topContentJson.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-xl overflow-hidden group block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.thumbnail} alt={post.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
                  <p className="text-white text-xs font-semibold text-center line-clamp-2">{post.caption}</p>
                  <p className="text-white/60 text-[10px]">
                    ❤️ {formatCompact(post.likes)} · 💬 {formatCompact(post.comments)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-white mb-3">Top YouTube Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {snapshots.youtube.topContentJson.map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative rounded-xl overflow-hidden aspect-video mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={video.thumbnail} alt={video.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-white/80 text-xs font-medium line-clamp-1">{video.caption}</p>
                <p className="text-white/30 text-[10px] mt-0.5">
                  {formatCompact(video.views ?? 0)} views · ❤️ {formatCompact(video.likes ?? 0)}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ── Audience ───────────────────────────────────────────────────── */}
        {snapshots.instagram.audienceJson && (
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3">Audience Demographics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender */}
              <div className="card-dark p-5">
                <p className="text-white/60 text-sm font-medium mb-3">Gender Split</p>
                <div className="space-y-2">
                  {[
                    { label: "Female", pct: snapshots.instagram.audienceJson.genderSplit.female, color: accent },
                    { label: "Male", pct: snapshots.instagram.audienceJson.genderSplit.male, color: "#ec4899" },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{label}</span>
                        <span className="text-white font-medium">{formatPercent(pct)}</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-white/60 text-sm font-medium mt-5 mb-3">Age Distribution</p>
                <div className="space-y-1.5">
                  {snapshots.instagram.audienceJson.ageBuckets.map(({ range, pct }) => (
                    <div key={range} className="flex items-center gap-2">
                      <span className="text-white/40 text-xs w-12">{range}</span>
                      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: accent }} />
                      </div>
                      <span className="text-white/40 text-xs w-10 text-right">{formatPercent(pct)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="card-dark p-5">
                <p className="text-white/60 text-sm font-medium mb-3">Top Countries</p>
                <div className="space-y-3">
                  {snapshots.instagram.audienceJson.topCountries.map(({ name, pct }, i) => (
                    <div key={name} className="flex items-center gap-3">
                      <span className="text-white/30 text-xs w-4">{i + 1}</span>
                      <span className="text-white/70 text-sm flex-1">{name}</span>
                      <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: accent }} />
                      </div>
                      <span className="text-white/40 text-xs w-10 text-right">{formatPercent(pct)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <p className="text-white/40 text-xs mb-2">Top Cities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {snapshots.instagram.audienceJson.topCities.map((city) => (
                      <span key={city} className="text-xs bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 text-white/50">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Campaigns ──────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-heading text-lg font-bold text-white mb-3">Brand Collaborations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {creator.campaigns.map((campaign) => (
              <div key={campaign.id} className="card-dark overflow-hidden">
                {campaign.thumbnailUrl && (
                  <div className="h-36 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={campaign.thumbnailUrl}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{campaign.brandName}</span>
                    {campaign.isFeatured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#f97316]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-white/60 text-xs">{campaign.title}</p>
                  {campaign.description && (
                    <p className="text-white/40 text-xs leading-relaxed mt-2 line-clamp-2">{campaign.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(campaign.metricsJson).map(([key, val]) => (
                      <span key={key} className="text-xs bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 text-white/50">
                        {key}: <span className="text-white/70">{formatCompact(val as number)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Packages ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-heading text-lg font-bold text-white mb-3">Collaboration Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {creator.packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`card-dark p-5 flex flex-col gap-3 ${i === 0 ? "border-purple-500/30" : ""}`}
              >
                {i === 0 && (
                  <span className="text-[10px] font-bold text-[#a855f7] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 self-start">
                    Most Popular
                  </span>
                )}
                <div>
                  <p className="font-heading font-bold text-white">{pkg.name}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${(pkg.priceCents / 100).toLocaleString()}
                  </p>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{pkg.description}</p>
                <ul className="space-y-1.5">
                  {pkg.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-1.5 text-xs text-white/60">
                      <span className="text-[#10b981] mt-0.5">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-auto w-full text-white text-sm font-semibold py-2.5 rounded-xl transition-opacity hover:opacity-90"
                  style={{ background: accent }}
                >
                  Book this package
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact CTA ────────────────────────────────────────────────── */}
        <section className="card-dark p-7 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: `radial-gradient(circle at 50% 0%, ${accent}, transparent 70%)` }}
          />
          <h2 className="relative font-heading text-2xl font-bold text-white mb-2">
            Let&apos;s work together
          </h2>
          <p className="relative text-white/50 text-sm mb-6">
            Open to brand partnerships, sponsored content, and long-term collaborations.
          </p>
          <div className="relative flex flex-wrap gap-3 justify-center">
            <a
              href={`mailto:${creator.contactEmail}`}
              className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              style={{ background: accent }}
            >
              <Mail className="h-4 w-4" />
              {creator.contactEmail}
            </a>
            {creator.websiteUrl && (
              <a
                href={creator.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <Globe className="h-4 w-4" />
                {creator.websiteUrl.replace("https://", "")}
              </a>
            )}
          </div>
          <div className="relative flex gap-4 justify-center mt-4 text-sm text-white/40">
            <span>{creator.instagramHandle}</span>
            <span>·</span>
            <span>{creator.youtubeHandle}</span>
          </div>
        </section>

        <p className="text-center text-xs text-white/20 pb-4">
          Powered by{" "}
          <Link href="/" className="brand-gradient-text font-semibold">
            Creasume
          </Link>
        </p>
      </main>
    </div>
  );
}
