import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, SectionHeader } from "@/components/store/Section";
import { brands } from "@/data/catalog";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Shop by Brand — IRIS Labels" },
      { name: "description", content: "Explore the IRIS family of labels: IRIS Pro, Studio, Court, Field, Trail and Everyday sports clothing collections." },
      { property: "og:title", content: "Shop by Brand | IRIS" },
      { property: "og:description", content: "Six IRIS labels, each built for a different kind of training." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Container className="py-14">
      <SectionHeader eyebrow="Labels" title="Shop by Brand" />
      <div className="grid gap-px bg-border md:grid-cols-3">
        {brands.map((b) => (
          <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} className="bg-background p-10 transition-colors hover:bg-secondary">
            <h2 className="display-xl text-2xl">{b.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{b.blurb}</p>
          </Link>
        ))}
      </div>
    </Container>
  ),
});
