import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/store/Section";
import { editorial } from "@/data/catalog";

export const Route = createFileRoute("/sport-edit")({
  head: () => ({
    meta: [
      { title: "IRIS Sport Edit — Sports Clothing Guides & Style" },
      { name: "description", content: "Guides from IRIS on building running outfits, gym clothing, basketball training kit and styling sports jerseys." },
      { property: "og:title", content: "IRIS Sport Edit" },
      { property: "og:description", content: "Sports clothing guides, styling and training essentials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Container className="py-14">
      <p className="eyebrow text-muted-foreground">Journal</p>
      <h1 className="display-xl mt-2 text-4xl md:text-6xl">IRIS Sport Edit</h1>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {editorial.map((e) => (
          <article key={e.slug}>
            <img src={e.image} alt={e.title} loading="lazy" width={1600} height={1104} className="aspect-16/10 w-full object-cover" />
            <h2 className="display-xl mt-5 text-2xl">{e.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{e.excerpt}</p>
          </article>
        ))}
      </div>
    </Container>
  ),
});
