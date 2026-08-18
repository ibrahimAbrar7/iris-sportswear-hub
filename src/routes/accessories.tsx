import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Sports Accessories — Bags, Caps & Socks | IRIS" },
      { name: "description", content: "IRIS sports accessories: duffel bags, backpacks, caps, socks, headbands, gloves and bottles to finish your kit." },
      { property: "og:title", content: "Sports Accessories — Bags, Caps & Socks | IRIS" },
      { property: "og:description", content: "Finish the kit with IRIS sports accessories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CatalogView
      eyebrow="Kit Bag"
      title="Accessories"
      description="Bags, caps, socks and training extras."
      items={products.filter((p) => p.department === "accessories")}
      hideFacets={["type"]}
    />
  ),
});
