import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) || "" }),
  head: () => ({
    meta: [
      { title: "Search Sports Clothing | IRIS" },
      { name: "description", content: "Search IRIS by product, brand, sport, clothing type or SKU to find the right sports apparel." },
      { property: "og:title", content: "Search | IRIS" },
      { property: "og:description", content: "Find sports clothing fast at IRIS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const term = q.trim().toLowerCase();
  const items = term
    ? products.filter((p) =>
        [p.name, p.brand, p.sport, p.type, p.sku, p.collection, ...p.tags].join(" ").toLowerCase().includes(term),
      )
    : products;
  return (
    <CatalogView eyebrow="Search" title={q ? `Results for "${q}"` : "Search"} items={items} />
  );
}
