import type { Metadata } from "next";
import { RefreshCw, Unplug } from "lucide-react";
import { InstagramIcon, YoutubeIcon, TikTokIcon } from "@/components/ui/brand-icons";

export const metadata: Metadata = { title: "Connections" };

const PLATFORMS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: InstagramIcon,
    gradientFrom: "#a855f7",
    gradientTo: "#ec4899",
    connected: true,
    handle: "@sample.creator",
    syncedAt: "Just now",
    postCount: 142,
    description: "Connect your Instagram Business or Creator account to sync followers, engagement, and top posts.",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: YoutubeIcon,
    gradientFrom: "#ef4444",
    gradientTo: "#dc2626",
    connected: false,
    handle: null,
    syncedAt: null,
    postCount: null,
    description: "Connect your YouTube channel to sync subscriber count, views, and top-performing videos.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: TikTokIcon,
    gradientFrom: "#000000",
    gradientTo: "#333333",
    connected: false,
    handle: null,
    syncedAt: null,
    postCount: null,
    description: "TikTok integration coming soon. Join the waitlist to be notified when it's available.",
    comingSoon: true,
  },
];

export default function ConnectionsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Connected Platforms</h1>
        <p className="text-white/40 text-sm mt-1">
          Connect your social accounts to power your Influence Card.
        </p>
      </div>

      <div className="space-y-4">
        {PLATFORMS.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.id} className="card-dark p-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `linear-gradient(135deg, ${platform.gradientFrom}, ${platform.gradientTo})` }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-white">{platform.name}</h3>
                    {platform.connected && (
                      <span className="text-[#10b981] text-xs font-semibold px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                        Connected
                      </span>
                    )}
                    {platform.comingSoon && (
                      <span className="text-white/40 text-xs px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {platform.connected && platform.handle ? (
                    <div className="flex items-center gap-3 text-sm text-white/50 mb-3">
                      <span>{platform.handle}</span>
                      <span>·</span>
                      <span className="text-[#10b981]">Synced {platform.syncedAt}</span>
                      {platform.postCount && (
                        <>
                          <span>·</span>
                          <span>{platform.postCount} posts</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm mb-3">{platform.description}</p>
                  )}

                  {/* Actions */}
                  {platform.connected ? (
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-xs px-3 py-2 rounded-xl transition-colors">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Sync now
                      </button>
                      <button className="flex items-center gap-2 border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 text-xs px-3 py-2 rounded-xl transition-colors">
                        <Unplug className="h-3.5 w-3.5" />
                        Disconnect
                      </button>
                    </div>
                  ) : !platform.comingSoon ? (
                    <button className="brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                      Connect {platform.name}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="border border-white/[0.06] text-white/20 text-sm px-5 py-2.5 rounded-xl cursor-not-allowed"
                    >
                      Notify me
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <p className="text-white/25 text-xs leading-relaxed">
        Creasume only reads public analytics. We never post on your behalf. Tokens are encrypted at rest.
      </p>
    </div>
  );
}
