"use client";

import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { syncInstagram } from "@/lib/actions/creator";

export default function RefreshButton({ hasInstagram }: { hasInstagram: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleRefresh() {
    if (!hasInstagram) return;
    startTransition(async () => {
      await syncInstagram();
    });
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending || !hasInstagram}
      title={!hasInstagram ? "Connect Instagram to refresh stats" : "Sync latest stats"}
      className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm px-4 py-2 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
      {isPending ? "Syncing…" : "Refresh Stats"}
    </button>
  );
}
