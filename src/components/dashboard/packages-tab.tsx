"use client";

import { Plus, GripVertical, Pencil, Trash2, CheckCircle2 } from "lucide-react";

const MOCK_PACKAGES = [
  {
    id: "p1",
    name: "Instagram Reel",
    price: "$1,500",
    description: "One cinematic travel reel with professional editing.",
    deliverables: ["1 × 30-60s Reel", "3 × Stories", "Full usage rights (30 days)"],
  },
  {
    id: "p2",
    name: "Story Pack",
    price: "$600",
    description: "5 Instagram Stories with swipe-up links and brand mention.",
    deliverables: ["5 × Stories", "Link in bio for 48h", "Analytics report"],
  },
  {
    id: "p3",
    name: "Full Campaign",
    price: "$5,000",
    description: "Complete brand campaign across Instagram and YouTube.",
    deliverables: ["2 × Reels", "1 × YouTube integration", "10 × Stories", "Full usage rights (90 days)"],
  },
];

export default function PackagesTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-white text-lg">Collaboration Packages</h3>
          <p className="text-white/40 text-sm mt-0.5">Define what brands can book with you.</p>
        </div>
        <button className="flex items-center gap-2 brand-gradient text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Add Package
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className="card-dark p-4 flex items-start gap-3 hover:border-white/[0.12] transition-colors"
          >
            <div className="text-white/20 cursor-grab mt-1">
              <GripVertical className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white text-sm font-semibold">{pkg.name}</p>
                <span className="text-[#10b981] text-xs font-bold">{pkg.price}</span>
              </div>
              <p className="text-white/40 text-xs mb-2">{pkg.description}</p>
              <div className="flex flex-wrap gap-2">
                {pkg.deliverables.map((d) => (
                  <span key={d} className="flex items-center gap-1 text-white/50 text-[10px]">
                    <CheckCircle2 className="h-2.5 w-2.5 text-[#10b981] shrink-0" />
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
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
    </div>
  );
}
