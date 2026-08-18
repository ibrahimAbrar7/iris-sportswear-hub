import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/footwear")({
  head: () => ({
    meta: [
      { title: "Footwear — A Curated Edit | IRIS" },
      { name: "description", content: "A deliberately small IRIS footwear edit: running, training, basketball and soccer shoes plus recovery slides." },
      { property: "og:title", content: "Footwear — A Curated Edit | IRIS" },
      { property: "og:description", content: "A small, curated footwear edit to finish the outfit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CatalogView
      eyebrow="Secondary Category"
      title="Footwear"
      description="Clothing leads at IRIS — footwear is a tight, curated edit."
      items={products.filter((p) => p.department === "footwear")}
    />
  ),
});
