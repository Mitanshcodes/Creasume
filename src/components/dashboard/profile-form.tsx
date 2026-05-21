"use client";

import { Upload } from "lucide-react";

interface ProfileFormProps {
  values: {
    displayName: string;
    username: string;
    bio: string;
    location: string;
    niche: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function ProfileForm({ values, onChange }: ProfileFormProps) {
  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <section>
        <h3 className="font-heading font-bold text-white text-lg mb-1">Basic Info</h3>
        <p className="text-white/40 text-sm mb-5">Update your photo and personal details.</p>

        {/* Photo upload */}
        <div className="card-dark p-5 flex items-center gap-5 mb-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
            {values.displayName.charAt(0) || "D"}
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

        {/* Fields */}
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
                onChange={(e) => onChange("username", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-[100px] pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm text-white/60 mb-1.5">Bio</label>
          <textarea
            value={values.bio}
            onChange={(e) => onChange("bio", e.target.value)}
            rows={3}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Location</label>
            <input
              value={values.location}
              onChange={(e) => onChange("location", e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Niche</label>
            <input
              value={values.niche}
              onChange={(e) => onChange("niche", e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Analytics (read-only) */}
      <section>
        <h3 className="font-heading font-bold text-white text-lg mb-1">Analytics</h3>
        <p className="text-white/40 text-sm mb-5">Update your key performance metrics.</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Followers", value: "125,000" },
            { label: "Engagement Rate", value: "4.2%" },
            { label: "Total Views", value: "2,500,000" },
            { label: "Total Reach", value: "1,800,000" },
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
          Analytics are synced automatically.{" "}
          <button className="text-[#10b981] hover:opacity-80 transition-opacity">Refresh from Instagram →</button>
        </p>
      </section>
    </div>
  );
}
