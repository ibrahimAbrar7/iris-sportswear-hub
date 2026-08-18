import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/new-in")({
  head: () => ({
    meta: [
      { title: "New In — Latest Sports Clothing Arrivals | IRIS" },
      { name: "description", content: "The newest IRIS sports clothing: jerseys, performance tops, shorts, leggings, hoodies and jackets, fresh to the floor." },
      { property: "og:title", content: "New In — Latest Sports Clothing Arrivals | IRIS" },
      { property: "og:description", content: "Fresh sports clothing arrivals at IRIS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CatalogView
      eyebrow="Just Landed"
      title="New In"
      description="New clothing arrivals across every sport."
      items={[...products].sort((a, b) => Number(b.isNew) - Number(a.isNew))}
    />
  ),
});
