import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, SectionHeader } from "@/components/store/Section";
import { ProductGrid } from "@/components/store/ProductCard";
import { clothingCategories, products } from "@/data/catalog";

export const Route = createFileRoute("/clothing/")({
  head: () => ({
    meta: [
      { title: "Sports Clothing — Jerseys, Tees, Shorts & Hoodies | IRIS" },
      { name: "description", content: "Shop all IRIS sports clothing by type: jerseys, t-shirts, shorts, hoodies, joggers, leggings, tracksuits, jackets, sports bras and compression." },
      { property: "og:title", content: "Sports Clothing | IRIS" },
      { property: "og:description", content: "Every clothing category at IRIS, built for sport." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Container className="py-14">
      <SectionHeader eyebrow="Clothing First" title="Shop Sports Clothing" description="Ten core categories, engineered for training, game day and everyday." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {clothingCategories.map((c) => (
          <Link key={c.slug} to="/clothing/$category" params={{ category: c.slug }} className="border border-border p-6 transition-colors hover:bg-secondary">
            <h2 className="font-sans text-sm font-medium uppercase tracking-wider">{c.name}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{c.blurb}</p>
          </Link>
        ))}
      </div>
      <div className="mt-16">
        <SectionHeader title="Featured Clothing" />
        <ProductGrid items={products.filter((p) => p.department === "clothing" && p.isFeatured).slice(0, 8)} />
      </div>
    </Container>
  ),
});
