import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { formatCompact } from "@/lib/utils";

interface Campaign {
  id: string;
  brandName: string;
  brandLogoUrl?: string | null;
  title: string;
  description?: string | null;
  platform?: "INSTAGRAM" | "YOUTUBE" | null;
  contentUrl?: string | null;
  thumbnailUrl?: string | null;
  metricsJson?: Record<string, number> | null;
  isFeatured: boolean;
}

const PlatformIcon = ({ platform }: { platform: Campaign["platform"] }) => {
  if (platform === "INSTAGRAM") return <InstagramIcon className="h-3 w-3 text-pink-400" />;
  if (platform === "YOUTUBE") return <YoutubeIcon className="h-3 w-3 text-red-400" />;
  return null;
};

const metricLabel: Record<string, string> = {
  reach: "Reach",
  impressions: "Impressions",
  likes: "Likes",
  comments: "Comments",
  views: "Views",
  clicks: "Clicks",
  conversions: "Conversions",
};

export default function Campaigns({ campaigns }: { campaigns: Campaign[] }) {
  if (campaigns.length === 0) return null;

  const featured = campaigns.filter((c) => c.isFeatured);
  const rest = campaigns.filter((c) => !c.isFeatured);
  const ordered = [...featured, ...rest];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Brand Collaborations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ordered.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm group"
          >
            {/* Thumbnail */}
            {c.thumbnailUrl && (
              <div className="relative h-40 bg-muted overflow-hidden">
                <Image
                  src={c.thumbnailUrl}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  {c.brandLogoUrl ? (
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-border bg-muted">
                      <Image src={c.brandLogoUrl} alt={c.brandName} fill className="object-contain p-1" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg border border-border bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {c.brandName[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">{c.brandName}</p>
                    <p className="font-semibold text-sm leading-tight">{c.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {c.isFeatured && (
                    <Badge className="text-xs border border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
                      Featured
                    </Badge>
                  )}
                  {c.platform && (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <PlatformIcon platform={c.platform} />
                    </div>
                  )}
                </div>
              </div>

              {c.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {c.description}
                </p>
              )}

              {c.metricsJson && Object.keys(c.metricsJson).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(c.metricsJson)
                    .slice(0, 4)
                    .map(([key, val]) => (
                      <div key={key} className="bg-muted/50 rounded-lg px-2.5 py-1.5 text-center">
                        <p className="text-sm font-semibold">{formatCompact(val)}</p>
                        <p className="text-xs text-muted-foreground">{metricLabel[key] ?? key}</p>
                      </div>
                    ))}
                </div>
              )}

              {c.contentUrl && (
                <a
                  href={c.contentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  View campaign <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
