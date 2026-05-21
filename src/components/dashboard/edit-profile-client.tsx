"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Smartphone, Monitor, ExternalLink, Save, Check } from "lucide-react";
import LivePreview from "@/components/dashboard/live-preview";
import ProfileForm from "@/components/dashboard/profile-form";
import PortfolioTab from "@/components/dashboard/portfolio-tab";
import PackagesTab from "@/components/dashboard/packages-tab";
import DesignTab from "@/components/dashboard/design-tab";
import { updateProfile, updateDesign } from "@/lib/actions/creator";

type Tab = "Profile" | "Portfolio" | "Packages" | "Design";
const TABS: Tab[] = ["Profile", "Portfolio", "Packages", "Design"];

interface Props {
  initialProfile: {
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
  initialDesign: {
    accentColor: string;
    bgStyle: string;
    fontPair: string;
  };
  analytics: {
    followers: number;
    engagementRate: number;
    avgViews: number;
  };
}

export default function EditProfileClient({ initialProfile, initialDesign, analytics }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [previewMode, setPreviewMode] = useState<"phone" | "desktop">("phone");
  const [profile, setProfile] = useState(initialProfile);
  const [design, setDesign] = useState(initialDesign);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleProfileChange(key: string, value: string | string[]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      try {
        if (activeTab === "Design") {
          await updateDesign({
            accentColor: design.accentColor,
            backgroundStyle: design.bgStyle,
            fontPairing: design.fontPair,
          });
        } else {
          await updateProfile({
            displayName: profile.displayName,
            headline: profile.headline,
            bio: profile.bio,
            location: profile.location,
            niches: profile.niches,
            contactEmail: profile.contactEmail,
            websiteUrl: profile.websiteUrl,
          });
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch {
        setError("Failed to save. Please try again.");
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-heading text-xl font-bold text-white">Edit Influence Card</h1>

        {/* Tabs */}
        <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
            <button
              onClick={() => setPreviewMode("phone")}
              className={`p-2 rounded-lg transition-colors ${previewMode === "phone" ? "bg-white/[0.08] text-white" : "text-white/30"}`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-2 rounded-lg transition-colors ${previewMode === "desktop" ? "bg-white/[0.08] text-white" : "text-white/30"}`}
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>

          <Link
            href={`/${profile.username}`}
            className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-white text-sm px-4 py-2 rounded-xl transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Preview
          </Link>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 brand-gradient text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {isPending ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Two-column: form + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {activeTab === "Profile" && (
            <ProfileForm
              values={profile}
              onChange={handleProfileChange}
              analytics={analytics}
            />
          )}
          {activeTab === "Portfolio" && <PortfolioTab />}
          {activeTab === "Packages" && <PackagesTab />}
          {activeTab === "Design" && (
            <DesignTab
              accentColor={design.accentColor}
              bgStyle={design.bgStyle}
              fontPair={design.fontPair}
              onAccentChange={(c) => setDesign((d) => ({ ...d, accentColor: c }))}
              onBgStyleChange={(s) => setDesign((d) => ({ ...d, bgStyle: s }))}
              onFontPairChange={(p) => setDesign((d) => ({ ...d, fontPair: p }))}
            />
          )}
        </div>

        <div className="sticky top-8 self-start flex items-start justify-center pt-4">
          <LivePreview
            displayName={profile.displayName}
            username={profile.username}
            bio={profile.bio}
            location={profile.location}
            niche={profile.niches[0] ?? ""}
            accentColor={design.accentColor}
          />
        </div>
      </div>
    </div>
  );
}
