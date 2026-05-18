import { Mail, Globe } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";

interface ContactCTAProps {
  displayName: string;
  contactEmail?: string | null;
  websiteUrl?: string | null;
  instagramHandle?: string | null;
  youtubeHandle?: string | null;
}

export default function ContactCTA({
  displayName,
  contactEmail,
  websiteUrl,
  instagramHandle,
  youtubeHandle,
}: ContactCTAProps) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
      <h2 className="text-xl font-bold mb-2">Work with {displayName}</h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
        Interested in a collaboration? Reach out directly — let&apos;s create something great together.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {contactEmail && (
          <a href={`mailto:${contactEmail}`}>
            <Button className="brand-gradient border-0 text-white hover:opacity-90">
              <Mail className="h-4 w-4 mr-2" />
              Send an email
            </Button>
          </a>
        )}
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-border">
              <Globe className="h-4 w-4 mr-2" />
              Website
            </Button>
          </a>
        )}
        {instagramHandle && (
          <a
            href={`https://instagram.com/${instagramHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon" className="border-border">
              <InstagramIcon className="h-4 w-4 text-pink-400" />
            </Button>
          </a>
        )}
        {youtubeHandle && (
          <a
            href={`https://youtube.com/@${youtubeHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon" className="border-border">
              <YoutubeIcon className="h-4 w-4 text-red-400" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}
