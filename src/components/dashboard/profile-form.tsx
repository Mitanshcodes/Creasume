"use client";

import Link from "next/link";
import { Upload } from "lucide-react";

interface ProfileFormProps {
  values: {
    displayName: string;
    username: string;
    headline: string;
    bio: string;
    location: string;
    niches: string[];
    contactEmail: string;
    websiteUrl: string;
    avatarUrl: string | null;
  };
  onChange: (key: string, value: string | string[]) => void;
  analytics: {
    followers: number;
    engagementRate: number;
    avgViews: number;
  };
}

export default function ProfileForm({ values, onChange, analytics }: ProfileFormProps) {
  const nichesStr = values.niches.join(", ");

  function handleNichesChange(raw: string) {
    const arr = raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    onChange("niches", arr);
  }

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <section>
        <h3 className="font-heading font-bold text-white text-lg mb-1">Basic Info</h3>
        <p className="text-white/40 text-sm mb-5">Update your photo and personal details.</p>

        {/* Photo upload */}
        <div className="card-dark p-5 flex items-center gap-5 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
            {values.displayName.charAt(0)?.toUpperCase() || "C"}
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium mb-1">Upload Profile Photo</p>
            <p className="text-white/40 text-xs mb-3">Drag and drop your image here, or click to browse.</p>
            <button className="flex items-center gap-2 border border-white/10 text-white/70 text-xs px-4 py-2 rounded-lg hover:border-white/20 hover:text-white transition-colors">
              <Upload className="h-3.5 w-3.5" />
              Browse Files
            </button>
            <p className="text-white/20 text-[10px] mt-1.5">Recommended: Square, at least 400×400px (JPG, PNG)</p>
          </div>
        </div>

        {/* Name + Username */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Display Name</label>
            <input
              value={values.displayName}
              onChange={(e) => onChange("displayName", e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">creasume.com/</span>
              <input
                value={values.username}
                readOnly
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl pl-[100px] pr-4 py-3 text-sm text-white/40 cursor-default"
              />
            </div>
            <p className="text-white/20 text-[10px] mt-1">Username changes coming soon.</p>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-4">
          <label className="block text-sm text-white/60 mb-1.5">Headline</label>
          <input
            value={values.headline}
            onChange={(e) => onChange("headline", e.target.value)}
            placeholder="Lifestyle creator & UGC specialist"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>

        {/* Bio */}
        <div className="mt-4">
          <label className="block text-sm text-white/60 mb-1.5">Bio</label>
          <textarea
            value={values.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            rows={3}
            placeholder="Tell brands about yourself…"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
          />
        </div>

        {/* Location + Niches */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Location</label>
            <input
              value={values.location}
              onChange={(e) => onChange("location", e.target.value)}
              placeholder="Los Angeles, CA"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Niches</label>
            <input
              value={nichesStr}
              onChange={(e) => handleNichesChange(e.target.value)}
              placeholder="lifestyle, fitness, beauty"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <p className="text-white/20 text-[10px] mt-1">Comma-separated</p>
          </div>
        </div>

        {/* Contact + Website */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Contact Email</label>
            <input
              type="email"
              value={values.contactEmail}
              onChange={(e) => onChange("contactEmail", e.target.value)}
              placeholder="collabs@you.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Website URL</label>
            <input
              type="url"
              value={values.websiteUrl}
              onChange={(e) => onChange("websiteUrl", e.target.value)}
              placeholder="https://yoursite.com"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Analytics (read-only) */}
      <section>
        <h3 className="font-heading font-bold text-white text-lg mb-1">Analytics</h3>
        <p className="text-white/40 text-sm mb-5">Synced automatically from connected platforms.</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Followers", value: analytics.followers > 0 ? analytics.followers.toLocaleString() : "—" },
            { label: "Engagement Rate", value: analytics.engagementRate > 0 ? `${analytics.engagementRate.toFixed(2)}%` : "—" },
            { label: "Avg. Views", value: analytics.avgViews > 0 ? analytics.avgViews.toLocaleString() : "—" },
            { label: "Total Reach", value: "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <label className="block text-sm text-white/60 mb-1.5">{label}</label>
              <input
                value={value}
                readOnly
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-white/40 cursor-default"
              />
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs mt-3">
          Connect a platform to sync real data.{" "}
          <Link href="/dashboard/connections" className="text-[#10b981] hover:opacity-80 transition-opacity">
            Manage connections →
          </Link>
        </p>
      </section>
    </div>
  );
}
