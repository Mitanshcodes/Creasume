"use client";

import { MapPin, Mail, Globe, Share2, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";

interface HeroProps {
  displayName: string;
  username: string;
  headline?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  location?: string | null;
  niches: string[];
  contactEmail?: string | null;
  websiteUrl?: string | null;
  lastSyncedAt?: Date | null;
}

export default function Hero({
  displayName,
  username,
  headline,
  bio,
  avatarUrl,
  coverUrl,
  location,
  niches,
  contactEmail,
  websiteUrl,
  lastSyncedAt,
}: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative">
      {/* Cover */}
      <div className="h-48 sm:h-56 relative overflow-hidden rounded-t-2xl">
        {coverUrl ? (
          <Image src={coverUrl} alt="Cover" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 brand-gradient opacity-70" />
        )}
        {/* Live badge */}
        {lastSyncedAt && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white border border-white/10 cursor-default"
            title={`Last updated ${lastSyncedAt.toLocaleString()}`}
          >
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Live · {timeAgo(lastSyncedAt)}
          </div>
        )}
      </div>

      {/* Profile area */}
      <div className="px-6 pb-6 relative">
        {/* Avatar */}
        <div className="relative -mt-12 w-24 h-24">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={displayName}
              fill
              className="rounded-full border-4 border-card object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-card brand-gradient flex items-center justify-center text-3xl font-bold text-white">
              {displayName[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">@{username}</p>
            {headline && <p className="text-sm mt-2 text-foreground/80 max-w-lg">{headline}</p>}
            {bio && <p className="text-sm mt-2 text-muted-foreground max-w-lg leading-relaxed">{bio}</p>}

            {location && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {location}
              </div>
            )}

            {niches.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {niches.map((n) => (
                  <Badge
                    key={n}
                    variant="secondary"
                    className="text-xs capitalize border border-primary/20 bg-primary/10 text-primary hover:bg-primary/10"
                  >
                    {n}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 sm:flex-shrink-0">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`}>
                <Button size="sm" className="brand-gradient border-0 text-white hover:opacity-90">
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  Contact
                </Button>
              </a>
            )}
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="border-border">
                  <Globe className="h-3.5 w-3.5 mr-1.5" />
                  Website
                </Button>
              </a>
            )}
            <Button size="sm" variant="outline" className="border-border" onClick={handleShare}>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Share2 className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
