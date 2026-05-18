import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Hero from "@/components/influence-card/hero";
import StatsStrip from "@/components/influence-card/stats-strip";
import Platforms from "@/components/influence-card/platforms";
import TopContent from "@/components/influence-card/top-content";
import AudienceDemographics from "@/components/influence-card/audience-demographics";
import Campaigns from "@/components/influence-card/campaigns";
import Packages from "@/components/influence-card/packages";
import ContactCTA from "@/components/influence-card/contact-cta";

// ─── Demo data (used until real DB is wired up) ────────────────────────────

const DEMO_CREATOR = {
  username: "demo",
  displayName: "Alex Rivera",
  headline: "Travel & lifestyle creator based in NYC",
  bio: "I explore the world one adventure at a time. Partnered with 30+ global brands to tell authentic stories through travel, food, and culture.",
  avatarUrl: null,
  coverUrl: null,
  location: "New York City, NY",
  niches: ["travel", "lifestyle", "food", "photography"],
  contactEmail: "alex@creasume.com",
  websiteUrl: "https://alexrivera.com",
  isPublished: true,
  instagramHandle: "@alexrivera",
  youtubeHandle: "@alexrivera",
  snapshots: {
    instagram: {
      platform: "INSTAGRAM" as const,
      followers: 284000,
      engagementRate: 0.048,
      avgLikes: 9800,
      avgComments: 340,
      totalPosts: 412,
      lastSyncedAt: new Date(Date.now() - 2 * 3600 * 1000),
      audienceJson: {
        genderSplit: { female: 0.62, male: 0.38 },
        ageBuckets: [
          { range: "18-24", pct: 0.28 },
          { range: "25-34", pct: 0.41 },
          { range: "35-44", pct: 0.19 },
          { range: "45+", pct: 0.12 },
        ],
        topCountries: [
          { name: "United States", pct: 0.54 },
          { name: "United Kingdom", pct: 0.09 },
          { name: "Canada", pct: 0.07 },
          { name: "Australia", pct: 0.06 },
        ],
        topCities: ["New York", "Los Angeles", "London", "Toronto", "Sydney"],
      },
      topContentJson: [
        {
          url: "https://instagram.com/p/demo1",
          thumbnail: "https://picsum.photos/seed/ig1/400/400",
          likes: 32100,
          comments: 890,
          caption: "Sunrise over the Sahara 🌅",
        },
        {
          url: "https://instagram.com/p/demo2",
          thumbnail: "https://picsum.photos/seed/ig2/400/400",
          likes: 28400,
          comments: 612,
          caption: "Tokyo ramen at 2am hits different 🍜",
        },
        {
          url: "https://instagram.com/p/demo3",
          thumbnail: "https://picsum.photos/seed/ig3/400/400",
          likes: 24900,
          comments: 490,
          caption: "Amalfi Coast vibes forever 💙",
        },
      ],
    },
    youtube: {
      platform: "YOUTUBE" as const,
      followers: 142000,
      engagementRate: 0.065,
      avgViews: 48000,
      avgLikes: 3100,
      avgComments: 280,
      totalPosts: 87,
      lastSyncedAt: new Date(Date.now() - 4 * 3600 * 1000),
      audienceJson: null,
      topContentJson: [
        {
          url: "https://youtube.com/watch?v=demo1",
          thumbnail: "https://picsum.photos/seed/yt1/480/270",
          views: 182000,
          likes: 8900,
          comments: 740,
          caption: "I Lived in Tokyo for 30 Days",
        },
        {
          url: "https://youtube.com/watch?v=demo2",
          thumbnail: "https://picsum.photos/seed/yt2/480/270",
          views: 134000,
          likes: 6200,
          comments: 510,
          caption: "Budget Europe Trip: $50/Day Challenge",
        },
        {
          url: "https://youtube.com/watch?v=demo3",
          thumbnail: "https://picsum.photos/seed/yt3/480/270",
          views: 98000,
          likes: 4800,
          comments: 390,
          caption: "Morocco on $30/Day — Full Itinerary",
        },
      ],
    },
  },
  campaigns: [
    {
      id: "c1",
      brandName: "Away",
      brandLogoUrl: null,
      title: "Summer Travel Collection",
      description:
        "Showcased Away's new Bigger Carry-On across 4 destinations in 3 weeks. Produced 3 Reels + 8 Stories.",
      platform: "INSTAGRAM" as const,
      contentUrl: null,
      thumbnailUrl: "https://picsum.photos/seed/away/600/400",
      metricsJson: { reach: 520000, impressions: 780000, likes: 41200, comments: 1840 } as Record<string, number>,
      isFeatured: true,
    },
    {
      id: "c2",
      brandName: "Airalo",
      brandLogoUrl: null,
      title: "Global eSIM Partnership",
      description:
        "Long-term partnership promoting affordable data plans for international travelers.",
      platform: "YOUTUBE" as const,
      contentUrl: null,
      thumbnailUrl: "https://picsum.photos/seed/airalo/600/400",
      metricsJson: { reach: 210000, views: 148000, clicks: 12400 } as Record<string, number>,
      isFeatured: true,
    },
  ],
  packages: [
    {
      id: "p1",
      name: "Instagram Reel",
      description:
        "One cinematic travel reel with professional editing, voiceover, and location tags.",
      priceCents: 250000,
      currency: "USD",
      deliverables: [
        "1 × 30-60 second Reel",
        "3 × Stories with swipe-up",
        "Full usage rights (30 days)",
        "Performance report after 7 days",
      ],
    },
    {
      id: "p2",
      name: "YouTube Integration",
      description:
        "60-90 second mid-roll integration in an upcoming travel video (100k+ average views).",
      priceCents: 500000,
      currency: "USD",
      deliverables: [
        "60-90s mid-roll integration",
        "Product mention in title/description",
        "Pinned comment with affiliate link",
        "Full usage rights (90 days)",
      ],
    },
  ],
};

// ─── Page ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  // Later: fetch real creator data from DB
  if (username !== "demo") return { title: "Not Found" };
  const c = DEMO_CREATOR;
  return {
    title: `${c.displayName} (@${c.username})`,
    description: c.headline ?? undefined,
    openGraph: {
      title: `${c.displayName} — Creasume`,
      description: c.headline ?? undefined,
    },
  };
}

export default async function InfluenceCardPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // Only demo works without a real DB; real lookup comes in Step 2
  if (username !== "demo") notFound();

  const creator = DEMO_CREATOR;
  const { snapshots } = creator;

  const totalFollowers = snapshots.instagram.followers + snapshots.youtube.followers;
  const engagementRate =
    (snapshots.instagram.engagementRate + snapshots.youtube.engagementRate) / 2;
  const totalReach = snapshots.instagram.avgLikes * 10 + snapshots.youtube.avgViews;

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <a href="/" className="brand-gradient-text text-lg font-bold">
          Creasume
        </a>
        <a
          href="/signup"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Create your card →
        </a>
      </header>

      {/* Card */}
      <main className="max-w-[1100px] mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <Hero
            displayName={creator.displayName}
            username={creator.username}
            headline={creator.headline}
            bio={creator.bio}
            avatarUrl={creator.avatarUrl}
            coverUrl={creator.coverUrl}
            location={creator.location}
            niches={creator.niches}
            contactEmail={creator.contactEmail}
            websiteUrl={creator.websiteUrl}
            lastSyncedAt={snapshots.instagram.lastSyncedAt}
          />
        </div>

        {/* Stats */}
        <StatsStrip
          totalFollowers={totalFollowers}
          engagementRate={engagementRate}
          totalReach={totalReach}
          campaignCount={creator.campaigns.length}
        />

        {/* Platforms */}
        <Platforms
          platforms={[
            {
              ...snapshots.instagram,
              avgViews: null,
            },
            {
              ...snapshots.youtube,
              avgLikes: null,
              avgComments: null,
            },
          ]}
        />

        {/* Top Content */}
        <TopContent
          instagram={snapshots.instagram.topContentJson}
          youtube={snapshots.youtube.topContentJson}
        />

        {/* Audience */}
        <AudienceDemographics
          instagram={snapshots.instagram.audienceJson}
          youtube={snapshots.youtube.audienceJson}
        />

        {/* Campaigns */}
        <Campaigns campaigns={creator.campaigns} />

        {/* Packages */}
        <Packages packages={creator.packages} contactEmail={creator.contactEmail} />

        {/* Contact CTA */}
        <ContactCTA
          displayName={creator.displayName}
          contactEmail={creator.contactEmail}
          websiteUrl={creator.websiteUrl}
          instagramHandle={creator.instagramHandle}
          youtubeHandle={creator.youtubeHandle}
        />

        <p className="text-center text-xs text-muted-foreground pb-4">
          Powered by{" "}
          <a href="/" className="brand-gradient-text font-semibold">
            Creasume
          </a>
        </p>
      </main>
    </div>
  );
}
