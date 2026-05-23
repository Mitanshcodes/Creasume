"use client";

import { useTransition } from "react";
import { RefreshCw, Unplug, CheckCircle2, XCircle } from "lucide-react";
import { InstagramIcon, YoutubeIcon, TikTokIcon } from "@/components/ui/brand-icons";
import { syncInstagram, disconnectInstagram } from "@/lib/actions/creator";

type Account = { handle: string; lastSyncedAt: Date | null } | null;

function timeAgo(date: Date | null) {
  if (!date) return "Never";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ConnectionsClient({
  igAccount,
  ytAccount,
  successParam,
  errorParam,
}: {
  igAccount: Account;
  ytAccount: Account;
  successParam?: string;
  errorParam?: string;
}) {
  const [igPending, startIgTransition] = useTransition();

  function handleSync() {
    startIgTransition(async () => {
      await syncInstagram();
    });
  }

  function handleDisconnect() {
    if (!confirm("Disconnect Instagram? Your existing analytics data will be kept.")) return;
    startIgTransition(async () => {
      await disconnectInstagram();
    });
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Connected Platforms</h1>
        <p className="text-white/40 text-sm mt-1">
          Connect your social accounts to power your Influence Card.
        </p>
      </div>

      {/* Success / error banners */}
      {successParam === "instagram" && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Instagram connected successfully! Your stats have been synced.
        </div>
      )}
      {errorParam === "instagram_denied" && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <XCircle className="h-4 w-4 shrink-0" />
          Instagram connection was cancelled.
        </div>
      )}
      {errorParam === "instagram_failed" && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          <XCircle className="h-4 w-4 shrink-0" />
          Instagram connection failed. Make sure your account is a Business or Creator account.
        </div>
      )}

      <div className="space-y-4">
        {/* Instagram */}
        <div className="card-dark p-6">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
            >
              <InstagramIcon className="h-6 w-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-white">Instagram</h3>
                {igAccount ? (
                  <span className="text-[#10b981] text-xs font-semibold px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    Connected
                  </span>
                ) : null}
              </div>

              {igAccount ? (
                <div className="flex items-center gap-3 text-sm text-white/50 mb-3 flex-wrap">
                  <span>@{igAccount.handle}</span>
                  <span>·</span>
                  <span className="text-[#10b981]">
                    Synced {timeAgo(igAccount.lastSyncedAt)}
                  </span>
                </div>
              ) : (
                <p className="text-white/40 text-sm mb-3">
                  Connect your Instagram Business or Creator account to sync followers, engagement, and top posts.
                </p>
              )}

              {igAccount ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSync}
                    disabled={igPending}
                    className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-xs px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${igPending ? "animate-spin" : ""}`} />
                    {igPending ? "Syncing…" : "Sync now"}
                  </button>
                  <button
                    onClick={handleDisconnect}
                    disabled={igPending}
                    className="flex items-center gap-2 border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 text-xs px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                  >
                    <Unplug className="h-3.5 w-3.5" />
                    Disconnect
                  </button>
                </div>
              ) : (
                <a
                  href="/api/connections/instagram"
                  className="inline-block brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Connect Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* YouTube — coming soon */}
        <div className="card-dark p-6">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
            >
              <YoutubeIcon className="h-6 w-6 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-white">YouTube</h3>
                {ytAccount ? (
                  <span className="text-[#10b981] text-xs font-semibold px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                    Connected
                  </span>
                ) : null}
              </div>
              <p className="text-white/40 text-sm mb-3">
                {ytAccount
                  ? `@${ytAccount.handle}`
                  : "Connect your YouTube channel to sync subscribers, views, and top videos."}
              </p>
              <button
                disabled
                className="border border-white/[0.06] text-white/20 text-sm px-5 py-2.5 rounded-xl cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>

        {/* TikTok — coming soon */}
        <div className="card-dark p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex items-center justify-center shrink-0">
              <TikTokIcon className="h-6 w-6 text-white/50" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-white">TikTok</h3>
                <span className="text-white/40 text-xs px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] rounded-full">
                  Coming Soon
                </span>
              </div>
              <p className="text-white/40 text-sm mb-3">
                TikTok integration is on the roadmap.
              </p>
              <button
                disabled
                className="border border-white/[0.06] text-white/20 text-sm px-5 py-2.5 rounded-xl cursor-not-allowed"
              >
                Notify me
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white/25 text-xs leading-relaxed">
        Creasume only reads public analytics. We never post on your behalf. Tokens are encrypted at rest.
      </p>
    </div>
  );
}
