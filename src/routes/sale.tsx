import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Sports Sale — Clothing Markdowns | IRIS" },
      { name: "description", content: "Shop the IRIS sports sale: reduced jerseys, hoodies, shorts, leggings, tracksuits and accessories. All prices in USD." },
      { property: "og:title", content: "Sports Sale — Clothing Markdowns | IRIS" },
      { property: "og:description", content: "Reduced sports clothing across every sport." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CatalogView
      eyebrow="Markdowns"
      title="Sports Sale"
      description="Clothing-led markdowns across men's, women's and kids'."
      items={products.filter((p) => p.salePrice)}
    />
  ),
});
