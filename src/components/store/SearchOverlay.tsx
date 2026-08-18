import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatUSD, products } from "@/data/catalog";

const popular = [
  "Basketball Jerseys", "Soccer Jerseys", "Running Shorts", "Gym Leggings",
  "Training T-Shirts", "Men's Hoodies", "Women's Activewear", "Tracksuits", "Sports Jackets",
];

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((p) =>
        [p.name, p.brand, p.sport, p.type, p.department, p.sku, p.collection, ...p.tags]
          .join(" ").toLowerCase().includes(term),
      )
      .sort((a, b) => (a.department === "clothing" ? -1 : 1) - (b.department === "clothing" ? -1 : 1))
      .slice(0, 8);
  }, [q]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-0 max-w-full translate-y-0 rounded-none border-0 border-b border-border p-0 sm:max-w-full">
        <DialogTitle className="sr-only">Search IRIS</DialogTitle>
        <div className="mx-auto w-full max-w-3xl px-5 py-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onOpenChange(false);
              navigate({ to: "/search", search: { q } });
            }}
            className="flex items-center gap-3 border-b border-foreground pb-3"
          >
            <Search className="h-5 w-5" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sports clothing, jerseys, leggings…"
              className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
          </form>

          {results.length === 0 ? (
            <div className="mt-8">
              <p className="eyebrow text-muted-foreground">Popular searches</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {popular.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setQ(p)}
                    className="border border-border px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ul className="mt-8 space-y-4">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4"
                  >
                    <img src={p.image} alt={p.name} loading="lazy" width={64} height={80} className="h-20 w-16 object-cover" />
                    <span className="flex-1">
                      <span className="eyebrow block text-muted-foreground">{p.brand}</span>
                      <span className="block text-sm">{p.name}</span>
                    </span>
                    <span className="text-sm">{formatUSD(p.salePrice ?? p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
