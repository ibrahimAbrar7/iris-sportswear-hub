import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>) => ({ activity: (s.activity as string) || undefined }),
  head: () => ({
    meta: [
      { title: "Shop All Sports Clothing | IRIS" },
      { name: "description", content: "Browse the full IRIS catalog of sports clothing, accessories and select footwear. Filter by sport, gender, clothing type, size and color." },
      { property: "og:title", content: "Shop All Sports Clothing | IRIS" },
      { property: "og:description", content: "The full IRIS catalog: clothing-first, sport-specific, priced in USD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { activity } = Route.useSearch();
  const items = activity ? products.filter((p) => p.activity === activity) : products;
  return (
    <CatalogView
      eyebrow="All Products"
      title={activity ? `Shop ${activity}` : "Shop All"}
      description="Clothing-first sports fashion. Every price in USD."
      items={items}
    />
  );
}
