import Image from "next/image";
import { Heart, MessageCircle, Eye, ExternalLink } from "lucide-react";
import { formatCompact } from "@/lib/utils";

interface ContentItem {
  url: string;
  thumbnail: string;
  likes?: number;
  comments?: number;
  views?: number;
  caption?: string;
}

interface TopContentProps {
  instagram?: ContentItem[];
  youtube?: ContentItem[];
}

export default function TopContent({ instagram = [], youtube = [] }: TopContentProps) {
  const all = [
    ...instagram.slice(0, 6).map((c) => ({ ...c, platform: "instagram" as const })),
    ...youtube.slice(0, 6).map((c) => ({ ...c, platform: "youtube" as const })),
  ];

  if (all.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Top Content</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {all.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl overflow-hidden border border-border aspect-square block"
          >
            <Image
              src={item.thumbnail}
              alt={item.caption ?? "Content"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            {/* Metrics */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
              {item.likes != null && (
                <span className="flex items-center gap-1 text-white text-xs font-medium">
                  <Heart className="h-3 w-3" /> {formatCompact(item.likes)}
                </span>
              )}
              {item.comments != null && (
                <span className="flex items-center gap-1 text-white text-xs font-medium">
                  <MessageCircle className="h-3 w-3" /> {formatCompact(item.comments)}
                </span>
              )}
              {item.views != null && (
                <span className="flex items-center gap-1 text-white text-xs font-medium">
                  <Eye className="h-3 w-3" /> {formatCompact(item.views)}
                </span>
              )}
              <ExternalLink className="h-3 w-3 text-white ml-auto" />
            </div>
            {/* Platform dot */}
            <div
              className={`absolute top-2 left-2 w-2 h-2 rounded-full ${
                item.platform === "instagram" ? "bg-pink-400" : "bg-red-400"
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
