import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, SectionHeader } from "@/components/store/Section";
import { sports } from "@/data/catalog";

export const Route = createFileRoute("/sports/")({
  head: () => ({
    meta: [
      { title: "Shop by Sport — Basketball to Outdoor | IRIS" },
      { name: "description", content: "Shop IRIS clothing by sport: basketball, football, soccer, running, training, gym, tennis, baseball, volleyball, outdoor and lifestyle." },
      { property: "og:title", content: "Shop by Sport | IRIS" },
      { property: "og:description", content: "Every sport gets its own clothing collection at IRIS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Container className="py-14">
      <SectionHeader eyebrow="Discover" title="Shop by Sport" description="Eleven sports. Clothing-first collections for each." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sports.map((s) => (
          <Link key={s.slug} to="/sports/$sport" params={{ sport: s.slug }} className="group relative overflow-hidden bg-ink text-ink-foreground">
            <img src={s.image} alt={`${s.name} clothing`} loading="lazy" width={1600} height={1104} className="aspect-4/5 w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
              <h2 className="display-xl text-xl">{s.name}</h2>
              <p className="mt-1 text-xs text-ink-foreground/75">{s.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  ),
});
