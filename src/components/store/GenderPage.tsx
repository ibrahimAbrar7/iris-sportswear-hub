import { Link } from "@tanstack/react-router";
import { Container, SectionHeader } from "./Section";
import { ProductGrid } from "./ProductCard";
import { products, sports, type Gender } from "@/data/catalog";

const sportOrder: Record<string, string[]> = {
  men: ["basketball", "football", "soccer", "running", "training", "gym"],
  women: ["running", "training", "gym", "tennis", "basketball", "soccer"],
};

export function GenderPage({ gender, title }: { gender: Gender; title: string }) {
  const mine = products.filter((p) => p.gender === gender);
  const clothing = mine.filter((p) => p.department === "clothing");
  const hero = sports.find((s) => s.slug === (gender === "men" ? "basketball" : "running"))!;
  const types = Array.from(new Set(clothing.map((p) => p.typeSlug)));

  return (
    <>
      <section className="relative bg-ink text-ink-foreground">
        <img src={hero.image} alt={title} width={1600} height={1104} className="h-[46vh] min-h-80 w-full object-cover opacity-70" />
        <Container className="absolute inset-0 flex flex-col justify-end pb-10">
          <h1 className="display-xl text-4xl md:text-6xl">{title}</h1>
          <p className="mt-3 max-w-md text-sm text-ink-foreground/80">
            Performance apparel first — sport by sport, session by session.
          </p>
        </Container>
      </section>

      <Container className="py-14">
        <SectionHeader eyebrow="Shop by Sport" title="Sports" />
        <div className="flex flex-wrap gap-3">
          {(sportOrder[gender] ?? sports.map((s) => s.slug)).map((slug) => {
            const s = sports.find((x) => x.slug === slug)!;
            return (
              <Link key={slug} to="/sports/$sport" params={{ sport: slug }} className="eyebrow border border-border px-5 py-3 transition-colors hover:bg-ink hover:text-ink-foreground">
                {s.name}
              </Link>
            );
          })}
        </div>
      </Container>

      <Container className="py-6">
        <SectionHeader eyebrow="New" title={`New ${gender === "men" ? "Men's" : "Women's"} Clothing`}
          action={<Link to="/shop" className="eyebrow rule-link">Shop All</Link>} />
        <ProductGrid items={clothing.slice(0, 8)} />
      </Container>

      {types.map((t) => {
        const items = clothing.filter((p) => p.typeSlug === t).slice(0, 4);
        if (items.length < 2) return null;
        return (
          <Container key={t} className="py-10">
            <SectionHeader title={items[0].type}
              action={<Link to="/clothing/$category" params={{ category: t }} className="eyebrow rule-link">View All</Link>} />
            <ProductGrid items={items} />
          </Container>
        );
      })}

      <Container className="py-10">
        <SectionHeader title="Accessories" action={<Link to="/accessories" className="eyebrow rule-link">View All</Link>} />
        <ProductGrid items={mine.filter((p) => p.department === "accessories").slice(0, 4)} />
      </Container>
    </>
  );
}
