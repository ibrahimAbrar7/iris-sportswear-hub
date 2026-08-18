import { useMemo, useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Container } from "./Section";
import { ProductGrid } from "./ProductCard";
import { activities, type Product } from "@/data/catalog";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Facet = "gender" | "sport" | "type" | "brand" | "size" | "color" | "activity" | "collection";

const SORTS = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Name"] as const;
type Sort = (typeof SORTS)[number];

const uniq = (xs: string[]) => Array.from(new Set(xs)).sort();

export function CatalogView({
  title, description, items, eyebrow, hideFacets = [], intro,
}: {
  title: string;
  description?: string;
  items: Product[];
  eyebrow?: string;
  hideFacets?: Facet[];
  intro?: ReactNode;
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sort, setSort] = useState<Sort>("Featured");

  const facetOptions = useMemo(() => ({
    gender: uniq(items.map((p) => p.gender)),
    sport: uniq(items.map((p) => p.sport)),
    type: uniq(items.map((p) => p.type)),
    brand: uniq(items.map((p) => p.brand)),
    size: uniq(items.flatMap((p) => p.sizes)),
    color: uniq(items.flatMap((p) => p.colors.map((c) => c.name))),
    activity: uniq(items.map((p) => p.activity)).filter((a) => activities.includes(a)),
    collection: uniq(items.map((p) => p.collection)),
  }), [items]);

  const toggle = (facet: string, value: string) =>
    setSelected((prev) => {
      const cur = prev[facet] ?? [];
      return { ...prev, [facet]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });

  const filtered = useMemo(() => {
    const match = (p: Product) => {
      const f = selected;
      const ok = (facet: Facet, values: string[]) => !f[facet]?.length || f[facet].some((v) => values.includes(v));
      return (
        ok("gender", [p.gender]) &&
        ok("sport", [p.sport]) &&
        ok("type", [p.type]) &&
        ok("brand", [p.brand]) &&
        ok("size", p.sizes) &&
        ok("color", p.colors.map((c) => c.name)) &&
        ok("activity", [p.activity]) &&
        ok("collection", [p.collection]) &&
        (p.salePrice ?? p.price) <= maxPrice
      );
    };
    const out = items.filter(match);
    const price = (p: Product) => p.salePrice ?? p.price;
    switch (sort) {
      case "Newest": return [...out].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      case "Price: Low to High": return [...out].sort((a, b) => price(a) - price(b));
      case "Price: High to Low": return [...out].sort((a, b) => price(b) - price(a));
      case "Name": return [...out].sort((a, b) => a.name.localeCompare(b.name));
      default: return [...out].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
  }, [items, selected, maxPrice, sort]);

  const activeCount = Object.values(selected).flat().length;

  const Filters = (
    <div className="space-y-8">
      {(Object.keys(facetOptions) as Facet[])
        .filter((f) => !hideFacets.includes(f) && facetOptions[f].length > 1)
        .map((facet) => (
          <div key={facet}>
            <p className="eyebrow">{facet === "type" ? "Clothing Type" : facet}</p>
            <div className={facet === "color" || facet === "size" ? "mt-3 flex flex-wrap gap-2" : "mt-3 space-y-2"}>
              {facetOptions[facet].map((opt) => {
                const on = selected[facet]?.includes(opt);
                if (facet === "size" || facet === "color") {
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(facet, opt)}
                      className={`border px-3 py-1.5 text-xs transition-colors ${on ? "border-foreground bg-ink text-ink-foreground" : "border-border hover:border-foreground"}`}
                    >
                      {opt}
                    </button>
                  );
                }
                return (
                  <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm capitalize">
                    <input type="checkbox" checked={!!on} onChange={() => toggle(facet, opt)} className="h-3.5 w-3.5 accent-black" />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      <div>
        <p className="eyebrow">Price</p>
        <input
          type="range" min={20} max={200} step={5} value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-3 w-full accent-black"
        />
        <p className="mt-1 text-sm text-muted-foreground">Up to ${maxPrice}</p>
      </div>
      {activeCount > 0 && (
        <button type="button" onClick={() => setSelected({})} className="eyebrow rule-link">Clear all filters</button>
      )}
    </div>
  );

  return (
    <Container className="py-10 md:py-14">
      <header className="border-b border-border pb-8">
        {eyebrow && <p className="eyebrow text-muted-foreground">{eyebrow}</p>}
        <h1 className="display-xl mt-2 text-4xl md:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-sm text-muted-foreground">{description}</p>}
        {intro}
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <button type="button" className="eyebrow flex items-center gap-2 border border-border px-3 py-2 lg:hidden">
                    <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {activeCount > 0 && `(${activeCount})`}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] overflow-y-auto p-6 sm:w-96">
                  <SheetTitle className="eyebrow mb-6">Filters</SheetTitle>
                  {Filters}
                </SheetContent>
              </Sheet>
              <p className="text-xs text-muted-foreground">{filtered.length} products</p>
            </div>

            <label className="flex items-center gap-2 text-xs">
              <span className="eyebrow text-muted-foreground">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border border-border bg-background px-2 py-2 text-xs"
              >
                {SORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          {activeCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {Object.entries(selected).flatMap(([facet, values]) =>
                values.map((v) => (
                  <button key={`${facet}-${v}`} type="button" onClick={() => toggle(facet, v)} className="flex items-center gap-1 border border-border px-2 py-1 text-xs capitalize">
                    {v} <X className="h-3 w-3" />
                  </button>
                )),
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">No products match these filters.</p>
          ) : (
            <ProductGrid items={filtered} cols={3} />
          )}
        </div>
      </div>
    </Container>
  );
}
