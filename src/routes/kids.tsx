import { createFileRoute } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/kids")({
  head: () => ({
    meta: [
      { title: "Kids' Sports Clothing — Boys & Girls | IRIS" },
      { name: "description", content: "Kids' sports clothing at IRIS: boys' and girls' jerseys, tees, shorts, hoodies, joggers and tracksuits for every sport." },
      { property: "og:title", content: "Kids' Sports Clothing | IRIS" },
      { property: "og:description", content: "Boys' and girls' sports clothing built to be played in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CatalogView
      eyebrow="Boys & Girls"
      title="Kids' Sports Clothing"
      description="Jerseys, tees, shorts, hoodies, joggers and tracksuits — filter by boys or girls."
      items={products.filter((p) => p.gender === "boys" || p.gender === "girls")}
    />
  ),
});
