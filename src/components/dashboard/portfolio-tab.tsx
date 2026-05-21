"use client";

import { Plus, GripVertical, Star, Pencil, Trash2 } from "lucide-react";

const MOCK_CAMPAIGNS = [
  {
    id: "c1",
    brandName: "Away",
    title: "Summer Travel Collection",
    platform: "Instagram",
    metrics: { reach: "520K", likes: "41.2K" },
    featured: true,
  },
  {
    id: "c2",
    brandName: "Airalo",
    title: "Global eSIM Partnership",
    platform: "YouTube",
    metrics: { views: "148K", clicks: "12.4K" },
    featured: true,
  },
  {
    id: "c3",
    brandName: "Ritual",
    title: "Wellness Routine Feature",
    platform: "Instagram",
    metrics: { reach: "280K", likes: "18.5K" },
    featured: false,
  },
];

export default function PortfolioTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-white text-lg">Brand Campaigns</h3>
          <p className="text-white/40 text-sm mt-0.5">Drag to reorder. Featured campaigns appear first.</p>
        </div>
        <button className="flex items-center gap-2 brand-gradient text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Add Campaign
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <div
            key={campaign.id}
            className="card-dark p-4 flex items-center gap-3 hover:border-white/[0.12] transition-colors"
          >
            <div className="text-white/20 cursor-grab">
              <GripVertical className="h-5 w-5" />
            </div>

            {/* Brand logo placeholder */}
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
              <span className="text-white/50 text-sm font-bold">
                {campaign.brandName.charAt(0)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-white text-sm font-medium truncate">{campaign.title}</p>
                {campaign.featured && (
                  <span className="text-[#f97316] text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 shrink-0">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-white/40 text-xs">{campaign.brandName} · {campaign.platform}</p>
              <div className="flex gap-3 mt-1">
                {Object.entries(campaign.metrics).map(([key, val]) => (
                  <span key={key} className="text-white/50 text-xs">
                    {key}: <span className="text-white/70 font-medium">{val}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button className="p-2 rounded-lg text-white/30 hover:text-[#f97316] hover:bg-orange-500/10 transition-colors">
                <Star className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {MOCK_CAMPAIGNS.length === 0 && (
        <div className="card-dark p-12 text-center">
          <p className="text-white/30 text-sm">No campaigns yet.</p>
          <p className="text-white/20 text-xs mt-1">Add your first brand collaboration above.</p>
        </div>
      )}
    </div>
  );
}
