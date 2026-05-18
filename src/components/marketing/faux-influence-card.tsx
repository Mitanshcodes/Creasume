import { MapPin } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { formatCompact } from "@/lib/utils";

const stats = [
  { label: "Total Followers", value: 426000 },
  { label: "Avg Engagement", value: "4.8%", raw: true },
  { label: "Avg Reach / Post", value: 89000 },
  { label: "Brand Campaigns", value: 12, raw: true },
];

export default function FauxInfluenceCard() {
  return (
    <div className="bg-[#0d0d0d] text-white overflow-hidden max-h-[600px] overflow-y-hidden select-none">
      {/* Cover */}
      <div className="h-32 brand-gradient relative">
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/seed/cover/1200/300')] bg-cover bg-center" />
        {/* Live badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white border border-white/10">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Live
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 pb-4 relative">
        <div className="w-20 h-20 rounded-full border-4 border-[#0d0d0d] bg-gradient-to-br from-indigo-500 to-purple-500 -mt-10 flex items-center justify-center text-2xl font-bold">
          A
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Alex Rivera</h2>
            <p className="text-white/50 text-sm">@alexrivera · @alexrivera</p>
            <p className="text-white/70 text-sm mt-1">Travel & lifestyle creator based in NYC</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-white/40">
              <MapPin className="h-3 w-3" />
              New York City, NY
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["travel", "lifestyle", "food", "photography"].map((n) => (
                <Badge
                  key={n}
                  className="text-xs border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/10"
                >
                  {n}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 sm:flex-shrink-0">
            <button className="brand-gradient text-white text-sm px-4 py-2 rounded-lg font-medium">
              Contact
            </button>
            <button className="border border-white/10 text-white/70 text-sm px-4 py-2 rounded-lg">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="mx-6 mb-4 rounded-xl border border-white/6 bg-white/[0.02] grid grid-cols-4 divide-x divide-white/6">
        {stats.map(({ label, value, raw }) => (
          <div key={label} className="p-4 text-center">
            <p className="text-xl font-bold text-white">
              {raw ? value : formatCompact(value as number)}
            </p>
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="mx-6 mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-3">
            <InstagramIcon className="h-4 w-4 text-pink-400" />
            <span className="text-sm font-medium">Instagram</span>
          </div>
          <p className="text-2xl font-bold">284K</p>
          <p className="text-xs text-white/40">followers</p>
          <div className="mt-2 flex gap-4 text-xs text-white/50">
            <span>4.8% eng.</span>
            <span>9.8K avg likes</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/6 bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-3">
            <YoutubeIcon className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium">YouTube</span>
          </div>
          <p className="text-2xl font-bold">142K</p>
          <p className="text-xs text-white/40">subscribers</p>
          <div className="mt-2 flex gap-4 text-xs text-white/50">
            <span>6.5% eng.</span>
            <span>48K avg views</span>
          </div>
        </div>
      </div>

      {/* Gradient fade out */}
      <div className="h-16 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
    </div>
  );
}
