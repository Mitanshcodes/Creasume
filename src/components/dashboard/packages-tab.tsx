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
import { Plus, GripVertical, Pencil, Trash2, CheckCircle2, X } from "lucide-react";
import {
  addPackage,
  updatePackage,
  deletePackage,
  reorderPackages,
  type PackageData,
} from "@/lib/actions/creator";

export type Package = {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  deliverables: string[];
  order: number;
};

const EMPTY_FORM: PackageData = {
  name: "",
  description: "",
  priceCents: 0,
  deliverables: [],
};

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

// ─── Sortable row ────────────────────────────────────────────────────────────
function PackageRow({
  pkg,
  onEdit,
  onDelete,
}: {
  pkg: Package;
  onEdit: (p: Package) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: pkg.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="card-dark p-4 flex items-start gap-3 hover:border-white/[0.12] transition-colors"
    >
      <div
        className="text-white/20 cursor-grab touch-none mt-1"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-white text-sm font-semibold">{pkg.name}</p>
          <span className="text-[#10b981] text-xs font-bold">{formatPrice(pkg.priceCents)}</span>
        </div>
        {pkg.description && (
          <p className="text-white/40 text-xs mb-2">{pkg.description}</p>
        )}
        {pkg.deliverables.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pkg.deliverables.map((d) => (
              <span key={d} className="flex items-center gap-1 text-white/50 text-[10px]">
                <CheckCircle2 className="h-2.5 w-2.5 text-[#10b981] shrink-0" />
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onEdit(pkg)}
          className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(pkg.id)}
          className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function PackageModal({
  initial,
  onClose,
  onSave,
  isPending,
}: {
  initial: PackageData & { id?: string };
  onClose: () => void;
  onSave: (data: PackageData, id?: string) => void;
  isPending: boolean;
}) {
  const [form, setForm] = useState<PackageData & { id?: string }>(initial);
  const [deliverableInput, setDeliverableInput] = useState("");

  function set(key: string, val: string | number | string[]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function addDeliverable() {
    const d = deliverableInput.trim();
    if (!d) return;
    set("deliverables", [...(form.deliverables ?? []), d]);
    setDeliverableInput("");
  }

  function removeDeliverable(index: number) {
    set(
      "deliverables",
      (form.deliverables ?? []).filter((_, i) => i !== index)
    );
  }

  const priceInDollars = form.priceCents > 0 ? form.priceCents / 100 : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0d0d0d] border border-white/[0.08] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-heading font-bold text-white">
            {form.id ? "Edit Package" : "Add Package"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Package Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Instagram Reel"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs font-medium mb-1.5 block">Price (USD) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">$</span>
                <input
                  type="number"
                  value={priceInDollars}
                  onChange={(e) =>
                    set("priceCents", Math.round(parseFloat(e.target.value || "0") * 100))
                  }
                  placeholder="1500"
                  min={0}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-7 pr-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Description</label>
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={2}
              placeholder="What's included in this package?"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20 resize-none"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs font-medium mb-1.5 block">Deliverables</label>
            <div className="flex gap-2 mb-2">
              <input
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDeliverable())}
                placeholder="1 × 30-60s Reel"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/20"
              />
              <button
                onClick={addDeliverable}
                type="button"
                className="px-3 py-2 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white/60 hover:text-white text-sm transition-colors"
              >
                Add
              </button>
            </div>
            {(form.deliverables ?? []).length > 0 && (
              <div className="space-y-1.5">
                {(form.deliverables ?? []).map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg"
                  >
                    <span className="text-white/70 text-xs flex-1">{d}</span>
                    <button
                      onClick={() => removeDeliverable(i)}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
            disabled={isPending || !form.name.trim() || form.priceCents <= 0}
            className="px-5 py-2 brand-gradient text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function PackagesTab({ initialPackages }: { initialPackages: Package[] }) {
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [modal, setModal] = useState<(PackageData & { id?: string }) | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function openAdd() {
    setModal({ ...EMPTY_FORM });
  }

  function openEdit(p: Package) {
    setModal({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      priceCents: p.priceCents,
      deliverables: [...p.deliverables],
    });
  }

  function handleSave(data: PackageData, id?: string) {
    startTransition(async () => {
      if (id) {
        await updatePackage(id, data);
        setPackages((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, ...data } : p
          )
        );
      } else {
        await addPackage(data);
        setPackages((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            name: data.name,
            description: data.description ?? null,
            priceCents: data.priceCents,
            deliverables: data.deliverables,
            order: prev.length,
          },
        ]);
      }
      setModal(null);
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this package?")) return;
    startTransition(async () => {
      await deletePackage(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = packages.findIndex((p) => p.id === active.id);
    const newIndex = packages.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(packages, oldIndex, newIndex);
    setPackages(reordered);

    startTransition(async () => {
      await reorderPackages(reordered.map((p) => p.id));
    });
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-white text-lg">Collaboration Packages</h3>
            <p className="text-white/40 text-sm mt-0.5">Define what brands can book with you.</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 brand-gradient text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Add Package
          </button>
        </div>

        {packages.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <p className="text-white/30 text-sm">No packages yet.</p>
            <p className="text-white/20 text-xs mt-1">Define your first collaboration package above.</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={packages.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {packages.map((p) => (
                  <PackageRow
                    key={p.id}
                    pkg={p}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {modal && (
        <PackageModal
          initial={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          isPending={isPending}
        />
      )}
    </>
  );
}
