"use client";

import { useState } from "react";
import Link from "next/link";
import { Smartphone, Monitor, ExternalLink, Save } from "lucide-react";
import LivePreview from "@/components/dashboard/live-preview";
import ProfileForm from "@/components/dashboard/profile-form";
import PortfolioTab from "@/components/dashboard/portfolio-tab";
import PackagesTab from "@/components/dashboard/packages-tab";
import DesignTab from "@/components/dashboard/design-tab";

type Tab = "Profile" | "Portfolio" | "Packages" | "Design";

const TABS: Tab[] = ["Profile", "Portfolio", "Packages", "Design"];

const INITIAL_PROFILE = {
  displayName: "Demo Creator",
  username: "democreator",
  bio: "Mindful living for the modern gen. Brand deals open 🤍",
  location: "Los Angeles, CA",
  niche: "Lifestyle & Wellness",
};

const INITIAL_DESIGN = {
  accentColor: "#a855f7",
  bgStyle: "MESH_GRADIENT",
  fontPair: "SYNE_SPACE_GROTESK",
};

export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [previewMode, setPreviewMode] = useState<"phone" | "desktop">("phone");
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [design, setDesign] = useState(INITIAL_DESIGN);
  const [saved, setSaved] = useState(false);

  function handleProfileChange(key: string, value: string) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
                activeTab === tab
                  ? "bg-white/[0.08] text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Preview mode toggle */}
          <div className="flex items-center bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
            <button
              onClick={() => setPreviewMode("phone")}
              className={`p-2 rounded-lg transition-colors ${
                previewMode === "phone" ? "bg-white/[0.08] text-white" : "text-white/30"
              }`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-2 rounded-lg transition-colors ${
                previewMode === "desktop" ? "bg-white/[0.08] text-white" : "text-white/30"
              }`}
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
            className="flex items-center gap-2 brand-gradient text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Two-column: form + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: form */}
        <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {activeTab === "Profile" && (
            <ProfileForm values={profile} onChange={handleProfileChange} />
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

        {/* Right: live preview */}
        <div className="sticky top-8 self-start flex items-start justify-center pt-4">
          <LivePreview
            displayName={profile.displayName}
            username={profile.username}
            bio={profile.bio}
            location={profile.location}
            niche={profile.niche}
            accentColor={design.accentColor}
          />
        </div>
      </div>
    </div>
  );
}
