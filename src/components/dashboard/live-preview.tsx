"use client";

import { MapPin, Download, CalendarDays } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";

interface LivePreviewProps {
  displayName: string;
  username: string;
  bio: string;
  location: string;
  niche: string;
  avatarUrl?: string | null;
  accentColor: string;
  followers?: number;
  engagementRate?: string;
  totalViews?: string;
  totalReach?: string;
}

export default function LivePreview({
  displayName,
  username,
  bio,
  location,
  niche,
  accentColor,
  followers = 125000,
  engagementRate = "4.2%",
  totalViews = "2.5M",
  totalReach = "1.8M",
}: LivePreviewProps) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor}44)`,
  };

  return (
    <div className="relative">
      {/* LIVE PREVIEW badge */}
      <div className="absolute -top-3 left-4 z-10">
        <span
          className="text-white text-[10px] font-bold px-3 py-1 rounded-full"
          style={{ background: accentColor }}
        >
          LIVE PREVIEW
        </span>
      </div>

      {/* Phone frame */}
      <div className="mx-auto w-[300px] rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
        {/* Cover */}
        <div className="h-20 relative" style={gradientStyle}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/cover/600/200')] bg-cover bg-center" />
        </div>

        {/* Avatar */}
        <div className="px-5 pb-4 -mt-8 relative">
          <div
            className="w-16 h-16 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center text-xl font-bold text-white mb-3"
            style={gradientStyle}
          >
            {displayName.charAt(0)}
          </div>

          <h3 className="font-heading font-bold text-white text-lg leading-tight">{displayName}</h3>
          <p className="text-white/40 text-xs mt-0.5 font-mono">
            @{username} · {niche} · {location}
          </p>

          {/* Stat pills */}
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {[
              { label: "Followers", value: `${(followers / 1000).toFixed(0)}K`, color: accentColor },
              { label: "Eng. Rate", value: engagementRate, color: "#ec4899" },
              { label: "Total Views", value: totalViews, color: "#10b981" },
              { label: "Total Reach", value: totalReach, color: "#f97316" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-lg px-2.5 py-1.5 text-center"
                style={{ background: color + "15", border: `1px solid ${color}30` }}
              >
                <p className="text-white text-xs font-bold">{value}</p>
                <p className="text-white/40 text-[9px]">{label}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-white/60 text-xs leading-relaxed mt-3 line-clamp-2">{bio}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 text-white text-xs font-semibold py-2.5 rounded-xl"
              style={{ background: accentColor }}
            >
              <CalendarDays className="h-3 w-3" />
              Book a Collab
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 border border-white/15 text-white/60 text-xs py-2.5 rounded-xl">
              <Download className="h-3 w-3" />
              Download PDF
            </button>
          </div>

          {/* Location line */}
          {location && (
            <div className="flex items-center gap-1 mt-3 text-white/30 text-[10px]">
              <MapPin className="h-2.5 w-2.5" />
              {location}
            </div>
          )}
        </div>

        {/* Creator Wrapped hint */}
        <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-center gap-1.5 text-white/20 text-[10px]">
          <InstagramIcon className="h-2.5 w-2.5" />
          ↓ CREATOR WRAPPED
        </div>
      </div>
    </div>
  );
}
