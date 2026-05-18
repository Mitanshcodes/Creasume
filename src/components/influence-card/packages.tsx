import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface Package {
  id: string;
  name: string;
  description?: string | null;
  priceCents: number;
  currency: string;
  deliverables: string[];
}

interface PackagesProps {
  packages: Package[];
  contactEmail?: string | null;
}

export default function Packages({ packages, contactEmail }: PackagesProps) {
  if (packages.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Collaboration Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {packages.map((pkg, i) => {
          const subject = encodeURIComponent(`Collaboration Inquiry: ${pkg.name}`);
          const body = encodeURIComponent(
            `Hi,\n\nI'm interested in the "${pkg.name}" package (${formatCurrency(pkg.priceCents, pkg.currency)}).\n\nLet's connect!`
          );
          const href = contactEmail
            ? `mailto:${contactEmail}?subject=${subject}&body=${body}`
            : undefined;

          const isHighlighted = i === 0;

          return (
            <div
              key={pkg.id}
              className={`rounded-2xl border p-6 shadow-sm flex flex-col ${
                isHighlighted
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              {isHighlighted && (
                <span className="self-start text-xs font-medium text-primary border border-primary/30 bg-primary/10 rounded-full px-2.5 py-0.5 mb-3">
                  Most Popular
                </span>
              )}

              <h3 className="font-bold text-lg">{pkg.name}</h3>
              {pkg.description && (
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{pkg.description}</p>
              )}

              <p className="mt-4 text-3xl font-bold">
                {formatCurrency(pkg.priceCents, pkg.currency)}
              </p>

              {pkg.deliverables.length > 0 && (
                <ul className="mt-4 space-y-2 flex-1">
                  {pkg.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{d}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a href={href} className="mt-6 block">
                <Button
                  className={`w-full ${isHighlighted ? "brand-gradient border-0 text-white hover:opacity-90" : ""}`}
                  variant={isHighlighted ? "default" : "outline"}
                >
                  <Mail className="h-3.5 w-3.5 mr-2" />
                  Book this package
                </Button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
