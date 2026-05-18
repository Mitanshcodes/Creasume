import { RefreshCw } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { formatCompact, formatPercent, timeAgo } from "@/lib/utils";

interface PlatformData {
  platform: "INSTAGRAM" | "YOUTUBE";
  followers: number;
  engagementRate?: number | null;
  avgLikes?: number | null;
  avgComments?: number | null;
  avgViews?: number | null;
  totalPosts?: number | null;
  lastSyncedAt?: Date | null;
}

const platformConfig = {
  INSTAGRAM: {
    icon: InstagramIcon,
    name: "Instagram",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/20",
  },
  YOUTUBE: {
    icon: YoutubeIcon,
    name: "YouTube",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/20",
  },
};

export default function Platforms({ platforms }: { platforms: PlatformData[] }) {
  if (platforms.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Connected Platforms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {platforms.map((p) => {
          const cfg = platformConfig[p.platform];
          const Icon = cfg.icon;

          return (
            <div
              key={p.platform}
              className={`rounded-2xl border bg-card p-5 shadow-sm ${cfg.borderColor}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${cfg.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-4 w-4 ${cfg.color}`} />
                  </div>
                  <span className="font-semibold">{cfg.name}</span>
                </div>
                {p.lastSyncedAt && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3" />
                    {timeAgo(p.lastSyncedAt)}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Metric label="Followers" value={formatCompact(p.followers)} />
                {p.engagementRate != null && (
                  <Metric label="Engagement" value={formatPercent(p.engagementRate)} />
                )}
                {p.avgLikes != null && (
                  <Metric label="Avg Likes" value={formatCompact(p.avgLikes)} />
                )}
                {p.avgComments != null && (
                  <Metric label="Avg Comments" value={formatCompact(p.avgComments)} />
                )}
                {p.avgViews != null && (
                  <Metric label="Avg Views" value={formatCompact(p.avgViews)} />
                )}
                {p.totalPosts != null && (
                  <Metric label="Total Posts" value={String(p.totalPosts)} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/40 rounded-xl p-3">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
