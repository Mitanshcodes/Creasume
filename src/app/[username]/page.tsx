import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Globe, Mail, Download, CalendarDays, ExternalLink } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { formatCompact, formatPercent } from "@/lib/utils";
import { db } from "@/lib/db";

// ─── JSON type helpers ──────────────────────────────────────────────────────

interface AudienceJson {
  genderSplit: { female: number; male: number };
  ageBuckets: { range: string; pct: number }[];
  topCountries: { name: string; pct: number }[];
  topCities: string[];
}

interface IgPost {
  url: string;
  thumbnail: string;
  likes: number;
  comments: number;
  caption: string;
}

interface YtVideo {
  url: string;
  thumbnail: string;
  views?: number;
  likes?: number;
  caption: string;
}

interface MetricsJson {
  [key: string]: number;
}

function asAudience(raw: unknown): AudienceJson | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (!r.genderSplit || !r.ageBuckets || !r.topCountries) return null;
  return raw as AudienceJson;
}

function asIgPosts(raw: unknown): IgPost[] {
  if (!Array.isArray(raw)) return [];
  return raw as IgPost[];
}

function asYtVideos(raw: unknown): YtVideo[] {
  if (!Array.isArray(raw)) return [];
  return raw as YtVideo[];
}

function asMetrics(raw: unknown): MetricsJson {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  return raw as MetricsJson;
}

// ─── Stat pill ──────────────────────────────────────────────────────────────

function StatPill({ value, label, color }: { value: string; label: string; color: string }) {
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

// ─── Data fetch ─────────────────────────────────────────────────────────────

async function getCreator(username: string) {
  return db.creator.findUnique({
    where: { username },
    include: {
      socialAccounts: true,
      analyticsSnapshots: {
        orderBy: { capturedAt: "desc" },
      },
      campaigns: { orderBy: { order: "asc" } },
      packages: { orderBy: { order: "asc" } },
    },
  });
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const creator = await getCreator(username);
  if (!creator) return { title: "Not Found" };
  return {
    title: `${creator.displayName} (@${creator.username}) — Creasume`,
    description: creator.bio ?? `Check out ${creator.displayName}'s Influence Card on Creasume.`,
    openGraph: {
      title: `${creator.displayName} — Creasume Influence Card`,
      description: creator.bio ?? undefined,
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
  const creator = await getCreator(username);

  if (!creator || !creator.isPublished) notFound();

  const accent = creator.accentColor ?? "#a855f7";

  const igAccount = creator.socialAccounts.find((a) => a.platform === "INSTAGRAM");
  const ytAccount = creator.socialAccounts.find((a) => a.platform === "YOUTUBE");

  const igSnap = creator.analyticsSnapshots.find((s) => s.platform === "INSTAGRAM");
  const ytSnap = creator.analyticsSnapshots.find((s) => s.platform === "YOUTUBE");

  const igAudience = asAudience(igSnap?.audienceJson);
  const igPosts = asIgPosts(igSnap?.topContentJson);
  const ytVideos = asYtVideos(ytSnap?.topContentJson);

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
              {creator.displayName.charAt(0).toUpperCase()}
            </div>

            {/* Name + handle */}
            <h1 className="font-heading text-2xl font-bold text-white">{creator.displayName}</h1>
            <p className="text-white/40 text-sm font-mono mt-0.5">
              {igAccount?.handle ?? `@${creator.username}`}
              {creator.niches[0] ? ` · ${creator.niches[0]}` : ""}
              {creator.location ? ` · ${creator.location}` : ""}
            </p>

            {/* Stat pills */}
            {igSnap && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                <StatPill value={formatCompact(igSnap.followers)} label="Followers" color={accent} />
                <StatPill value={formatPercent(igSnap.engagementRate ?? 0)} label="Eng. Rate" color="#ec4899" />
                <StatPill value={formatCompact(igSnap.avgViews ?? 0)} label="Avg Views" color="#10b981" />
                <StatPill value={String(igSnap.totalPosts ?? 0)} label="Total Posts" color="#f97316" />
              </div>
            )}

            {/* Niche chips */}
            {creator.niches.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {creator.niches.map((n) => (
                  <span
                    key={n}
                    className="text-xs px-3 py-1 rounded-full border capitalize"
                    style={{ borderColor: accent + "40", color: accent, background: accent + "10" }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            )}

            {/* Bio */}
            {creator.bio && (
              <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-lg">{creator.bio}</p>
            )}

            {/* Location */}
            {creator.location && (
              <div className="flex items-center gap-1.5 mt-3 text-white/30 text-xs">
                <MapPin className="h-3 w-3" />
                {creator.location}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-5">
              {creator.contactEmail && (
                <a
                  href={`mailto:${creator.contactEmail}`}
                  className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
                  style={{ background: accent }}
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a Collab
                </a>
              )}
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

        {/* ── Connected Platforms ────────────────────────────────────────── */}
        {(igSnap || ytSnap) && (
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3">Connected Platforms</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {igSnap && (
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
                      Live
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Followers", value: formatCompact(igSnap.followers) },
                      { label: "Engagement", value: formatPercent(igSnap.engagementRate ?? 0) },
                      { label: "Avg Likes", value: formatCompact(igSnap.avgLikes ?? 0) },
                      { label: "Total Posts", value: String(igSnap.totalPosts ?? 0) },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                        <p className="text-white font-bold text-base">{value}</p>
                        <p className="text-white/40 text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ytSnap && (
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
                      Live
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Subscribers", value: formatCompact(ytSnap.followers) },
                      { label: "Engagement", value: formatPercent(ytSnap.engagementRate ?? 0) },
                      { label: "Avg Views", value: formatCompact(ytSnap.avgViews ?? 0) },
                      { label: "Total Videos", value: String(ytSnap.totalPosts ?? 0) },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/[0.03] rounded-xl p-3">
                        <p className="text-white font-bold text-base">{value}</p>
                        <p className="text-white/40 text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Top Instagram Posts ────────────────────────────────────────── */}
        {igPosts.length > 0 && (
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3">Top Instagram Posts</h2>
            <div className="grid grid-cols-3 gap-2">
              {igPosts.map((post) => (
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
        )}

        {/* ── Top YouTube Videos ─────────────────────────────────────────── */}
        {ytVideos.length > 0 && (
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3">Top YouTube Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ytVideos.map((video) => (
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
        )}

        {/* ── Audience Demographics ──────────────────────────────────────── */}
        {igAudience && (
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3">Audience Demographics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender + Age */}
              <div className="card-dark p-5">
                <p className="text-white/60 text-sm font-medium mb-3">Gender Split</p>
                <div className="space-y-2">
                  {[
                    { label: "Female", pct: igAudience.genderSplit.female, color: accent },
                    { label: "Male", pct: igAudience.genderSplit.male, color: "#ec4899" },
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
                  {igAudience.ageBuckets.map(({ range, pct }) => (
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

              {/* Countries + Cities */}
              <div className="card-dark p-5">
                <p className="text-white/60 text-sm font-medium mb-3">Top Countries</p>
                <div className="space-y-3">
                  {igAudience.topCountries.map(({ name, pct }, i) => (
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
                {igAudience.topCities.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <p className="text-white/40 text-xs mb-2">Top Cities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {igAudience.topCities.map((city) => (
                        <span key={city} className="text-xs bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 text-white/50">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Brand Collaborations ───────────────────────────────────────── */}
        {creator.campaigns.length > 0 && (
          <section>
            <h2 className="font-heading text-lg font-bold text-white mb-3">Brand Collaborations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creator.campaigns.map((campaign) => {
                const metrics = asMetrics(campaign.metricsJson);
                return (
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
                      {Object.keys(metrics).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {Object.entries(metrics).map(([key, val]) => (
                            <span key={key} className="text-xs bg-white/[0.04] border border-white/[0.06] rounded-full px-2.5 py-1 text-white/50">
                              {key}: <span className="text-white/70">{formatCompact(val)}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Packages ───────────────────────────────────────────────────── */}
        {creator.packages.length > 0 && (
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
                  {pkg.description && (
                    <p className="text-white/50 text-xs leading-relaxed">{pkg.description}</p>
                  )}
                  {pkg.deliverables.length > 0 && (
                    <ul className="space-y-1.5">
                      {pkg.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-1.5 text-xs text-white/60">
                          <span className="text-[#10b981] mt-0.5">✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
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
        )}

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
            {creator.contactEmail && (
              <a
                href={`mailto:${creator.contactEmail}`}
                className="flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                style={{ background: accent }}
              >
                <Mail className="h-4 w-4" />
                {creator.contactEmail}
              </a>
            )}
            {creator.websiteUrl && (
              <a
                href={creator.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-sm px-6 py-3 rounded-xl transition-colors"
              >
                <Globe className="h-4 w-4" />
                {creator.websiteUrl.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
          {(igAccount || ytAccount) && (
            <div className="relative flex gap-4 justify-center mt-4 text-sm text-white/40">
              {igAccount && <span>{igAccount.handle}</span>}
              {igAccount && ytAccount && <span>·</span>}
              {ytAccount && <span>{ytAccount.handle}</span>}
            </div>
          )}
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
