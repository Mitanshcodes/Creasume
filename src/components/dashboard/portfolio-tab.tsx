"use client";

import { useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, GripVertical, Star, Pencil, Trash2, X } from "lucide-react";
import {
  addCampaign,
  updateCampaign,
  deleteCampaign,
  toggleCampaignFeatured,
  reorderCampaigns,
  type CampaignData,
} from "@/lib/actions/creator";

export type Campaign = {
  id: string;
  brandName: string;
  title: string;
  description: string | null;
  platform: string | null;
  metricsJson: Record<string, number> | null;
  isFeatured: boolean;
  order: number;
};

const EMPTY_FORM: CampaignData = {
  brandName: "",
  title: "",
  description: "",
  platform: "",
  metrics: {},
  thumbnailUrl: "",
  contentUrl: "",
  isFeatured: false,
};

// ─── Sortable row ────────────────────────────────────────────────────────────
function CampaignRow({
  campaign,
  onEdit,
  onDelete,
  onToggleFeatured,
}: {
  campaign: Campaign;
  onEdit: (c: Campaign) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, val: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: campaign.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const metrics = campaign.metricsJson ?? {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-dark p-4 flex items-center gap-3 hover:border-white/[0.12] transition-colors"
    >
      <div
        className="text-white/20 cursor-grab touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0">
        <span className="text-white/50 text-sm font-bold">
          {campaign.brandName.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm font-medium truncate">{campaign.title}</p>
          {campaign.isFeatured && (
            <span className="text-[#f97316] text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 shrink-0">
              Featured
            </span>
          )}
        </div>
        <p className="text-white/40 text-xs">
          {campaign.brandName}
          {campaign.platform ? ` · ${campaign.platform}` : ""}
        </p>
        {Object.keys(metrics).length > 0 && (
          <div className="flex gap-3 mt-1 flex-wrap">
            {Object.entries(metrics).map(([key, val]) => (
              <span key={key} className="text-white/50 text-xs">
                {key}:{" "}
                <span className="text-white/70 font-medium">
                  {val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onToggleFeatured(campaign.id, !campaign.isFeatured)}
          className={`p-2 rounded-lg transition-colors ${
            campaign.isFeatured
              ? "text-[#f97316] bg-orange-500/10"
              : "text-white/30 hover:text-[#f97316] hover:bg-orange-500/10"
          }`}
          title={campaign.isFeatured ? "Unfeature" : "Feature"}
        >
          <Star className="h-4 w-4" fill={campaign.isFeatured ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => onEdit(campaign)}
          className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(campaign.id)}
          className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function CampaignModal({
  initial,
  onClose,
  onSave,
  isPending,
}: {
  initial: CampaignData & { id?: string };
  onClose: () => void;
  onSave: (data: CampaignData, id?: string) => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<CampaignData & { id?: string }>(initial);
  const [metricKey, setMetricKey] = useState("");
  const [metricVal, setMetricVal] = useState("");

  function set(key: string, val: string | boolean | Record<string, number>) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function addMetric() {
    const v = parseFloat(metricVal);
    if (!metricKey.trim() || isNaN(v)) return;
    set("metrics", { ...(form.metrics ?? {}), [metricKey.trim()]: v });
    setMetricKey("");
    setMetricVal("");
  }

  function removeMetric(key: string) {
    const next = { ...(form.metrics ?? {}) };
    delete next[key];
    set("metrics", next);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-heading font-bold text-white">
            {form.id ? "Edit Campaign" : "Add Campaign"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Brand Name *</label>
              <input
                value={form.brandName}
                onChange={(e) => set("brandName", e.target.value)}
                placeholder="Away, Nike…"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Platform</label>
              <select
                value={form.platform ?? ""}
                onChange={(e) => set("platform", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-white/20"
              >
                <option value="">— Any —</option>
                <option value="INSTAGRAM">Instagram</option>
                <option value="YOUTUBE">YouTube</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Campaign Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Summer Travel Collection"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="What did you do for this brand?"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20 resize-none"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Metrics</label>
            <div className="flex gap-2 mb-2">
              <input
                value={metricKey}
                onChange={(e) => setMetricKey(e.target.value)}
                placeholder="reach"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
              <input
                type="number"
                value={metricVal}
                onChange={(e) => setMetricVal(e.target.value)}
                placeholder="520000"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
              <button
                onClick={addMetric}
                type="button"
                className="px-3 py-2 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white/60 hover:text-white text-sm transition-colors"
              >
                Add
              </button>
            </div>
            {Object.keys(form.metrics ?? {}).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(form.metrics ?? {}).map(([k, v]) => (
                  <span
                    key={k}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] rounded-lg text-white/70"
                  >
                    {k}: {v}
                    <button onClick={() => removeMetric(k)} className="text-white/30 hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Content URL</label>
              <input
                value={form.contentUrl ?? ""}
                onChange={(e) => set("contentUrl", e.target.value)}
                placeholder="https://instagram.com/p/…"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Thumbnail URL</label>
              <input
                value={form.thumbnailUrl ?? ""}
                onChange={(e) => set("thumbnailUrl", e.target.value)}
                placeholder="https://…"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              onClick={() => set("isFeatured", !form.isFeatured)}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                form.isFeatured ? "bg-[#f97316]" : "bg-white/[0.08]"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  form.isFeatured ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-white/60 text-sm group-hover:text-white transition-colors">
              Mark as featured
            </span>
          </label>
        </div>

        <div className="p-5 border-t border-white/[0.06] flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/[0.08] rounded-xl text-white/50 hover:text-white text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form, form.id)}
            disabled={isPending || !form.brandName.trim() || !form.title.trim()}
            className="px-5 py-2 brand-gradient text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PortfolioTab({ initialCampaigns }: { initialCampaigns: Campaign[] }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [modal, setModal] = useState<(CampaignData & { id?: string }) | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function openAdd() {
    setModal({ ...EMPTY_FORM });
  }

  function openEdit(c: Campaign) {
    setModal({
      id: c.id,
      brandName: c.brandName,
      title: c.title,
      description: c.description ?? "",
      platform: (c.platform as CampaignData["platform"]) ?? "",
      metrics: c.metricsJson ?? {},
      isFeatured: c.isFeatured,
    });
  }

  function handleSave(data: CampaignData, id?: string) {
    startTransition(async () => {
      if (id) {
        await updateCampaign(id, data);
        setCampaigns((prev) =>
          prev.map((c) =>
            c.id === id
              ? {
                  ...c,
                  ...data,
                  metricsJson: data.metrics ?? null,
                  platform: data.platform || null,
                }
              : c
          )
        );
      } else {
        await addCampaign(data);
        // Re-fetch handled by revalidatePath; optimistically add a placeholder
        setCampaigns((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            brandName: data.brandName,
            title: data.title,
            description: data.description ?? null,
            platform: data.platform || null,
            metricsJson: data.metrics ?? null,
            isFeatured: data.isFeatured ?? false,
            order: prev.length,
          },
        ]);
      }
      setModal(null);
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this campaign?")) return;
    startTransition(async () => {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    });
  }

  function handleToggleFeatured(id: string, val: boolean) {
    startTransition(async () => {
      await toggleCampaignFeatured(id, val);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFeatured: val } : c))
      );
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = campaigns.findIndex((c) => c.id === active.id);
    const newIndex = campaigns.findIndex((c) => c.id === over.id);
    const reordered = arrayMove(campaigns, oldIndex, newIndex);
    setCampaigns(reordered);

    startTransition(async () => {
      await reorderCampaigns(reordered.map((c) => c.id));
    });
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-white text-lg">Brand Campaigns</h3>
            <p className="text-white/40 text-sm mt-0.5">Drag to reorder. Featured campaigns appear first.</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 brand-gradient text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Add Campaign
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <p className="text-white/30 text-sm">No campaigns yet.</p>
            <p className="text-white/20 text-xs mt-1">Add your first brand collaboration above.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={campaigns.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <CampaignRow
                    key={c.id}
                    campaign={c}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onToggleFeatured={handleToggleFeatured}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {modal && (
        <CampaignModal
          initial={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          isPending={isPending}
        />
      )}
    </>
  );
}
