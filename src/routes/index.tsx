import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/store/HeroSlider";
import { Newsletter } from "@/components/store/Newsletter";
import { Container, SectionHeader } from "@/components/store/Section";
import { ProductGrid } from "@/components/store/ProductCard";
import {
  activities, brands, clothingCategories, editorial, products, sports,
} from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IRIS — Premium Sports Clothing for Every Sport" },
      { name: "description", content: "Shop premium sports clothing at IRIS: jerseys, performance tops, shorts, leggings, hoodies and tracksuits for basketball, soccer, running, training and more. USD pricing, US shipping." },
      { property: "og:title", content: "IRIS — Premium Sports Clothing for Every Sport" },
      { property: "og:description", content: "Clothing-first sports fashion. Shop by sport, gender and activity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "IRIS",
          description: "Premium sport-specific clothing and athletic fashion retailer.",
          areaServed: "US",
        }),
      },
    ],
  }),
  component: Home,
});

const clothing = products.filter((p) => p.department === "clothing");

function Home() {
  const newIn = [...clothing.filter((p) => p.isNew), ...clothing].slice(0, 8);
  const trending = clothing.filter((p) => p.collection === "Trending").slice(0, 8);
  const accessories = products.filter((p) => p.department === "accessories").slice(0, 4);
  const footwear = products.filter((p) => p.department === "footwear").slice(0, 4);
  const completeLook = clothing.filter((p) => p.sport === "basketball").slice(0, 4);

  return (
    <>
      <HeroSlider />

      <Container className="py-16 md:py-24">
        <SectionHeader
          eyebrow="Discover"
          title="Shop by Sport"
          description="Every sport gets its own kit — jerseys, tops, shorts, layers and accessories."
          action={<Link to="/sports" className="eyebrow rule-link">All Sports</Link>}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {sports.map((s, i) => (
            <Link
              key={s.slug}
              to="/sports/$sport"
              params={{ sport: s.slug }}
              className={`group relative overflow-hidden bg-ink text-ink-foreground ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            >
              <img
                src={s.image}
                alt={`${s.name} apparel`}
                loading="lazy"
                width={1600}
                height={1104}
                className={`w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "aspect-square md:h-full" : "aspect-4/5"}`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <h3 className="display-xl text-xl md:text-2xl">{s.name}</h3>
                <p className="mt-1 hidden text-xs text-ink-foreground/75 md:block">{s.blurb}</p>
                <span className="eyebrow mt-3 inline-block rule-link">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16 md:py-24">
        <SectionHeader eyebrow="Clothing First" title="Shop Sports Clothing"
          action={<Link to="/clothing" className="eyebrow rule-link">All Clothing</Link>} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {clothingCategories.map((c) => (
            <Link key={c.slug} to="/clothing/$category" params={{ category: c.slug }} className="group border border-border p-6 transition-colors hover:bg-secondary">
              <h3 className="font-sans text-sm font-medium uppercase tracking-wider">{c.name}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16 md:py-24">
        <SectionHeader eyebrow="Just Landed" title="New Clothing Arrivals"
          action={<Link to="/new-in" className="eyebrow rule-link">View All</Link>} />
        <ProductGrid items={newIn} />
      </Container>

      {["basketball", "soccer", "running", "training"].map((slug, idx) => {
        const sport = sports.find((s) => s.slug === slug)!;
        const feat = clothing.filter((p) => p.sport === slug).slice(0, 3);
        return (
          <Container key={slug} className="py-12">
            <div className={`grid items-center gap-10 lg:grid-cols-2 ${idx % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <img src={sport.image} alt={`${sport.name} apparel campaign`} loading="lazy" width={1600} height={1104} className="aspect-4/3 w-full object-cover" />
              <div>
                <p className="eyebrow text-muted-foreground">{sport.name}</p>
                <h2 className="display-xl mt-2 text-3xl md:text-5xl">{sport.blurb}</h2>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {feat.map((p) => (
                    <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }}>
                      <img src={p.image} alt={p.name} loading="lazy" width={900} height={1100} className="aspect-4/5 w-full object-cover" />
                      <p className="mt-2 text-xs">{p.name}</p>
                    </Link>
                  ))}
                </div>
                <Link to="/sports/$sport" params={{ sport: sport.slug }} className="eyebrow mt-8 inline-block bg-ink px-7 py-4 text-ink-foreground">
                  Shop {sport.name}
                </Link>
              </div>
            </div>
          </Container>
        );
      })}

      <Container className="py-16 md:py-24">
        <SectionHeader eyebrow="Popular Now" title="Trending Clothing" />
        <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:px-0">
          {trending.map((p) => (
            <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="w-[60vw] shrink-0 snap-start md:w-72">
              <img src={p.image} alt={p.name} loading="lazy" width={900} height={1100} className="aspect-4/5 w-full object-cover" />
              <p className="eyebrow mt-3 text-muted-foreground">{p.brand}</p>
              <p className="text-sm">{p.name}</p>
              <p className="text-sm">${(p.salePrice ?? p.price).toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Shop By" title="Men · Women · Kids" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { to: "/men" as const, label: "Men's Sports Clothing", img: sports[0].image },
            { to: "/women" as const, label: "Women's Sports Clothing", img: sports[3].image },
            { to: "/kids" as const, label: "Kids' Sports Clothing", img: sports[10].image },
          ].map((g) => (
            <Link key={g.to} to={g.to} className="group relative overflow-hidden bg-ink text-ink-foreground">
              <img src={g.img} alt={g.label} loading="lazy" width={1600} height={1104} className="aspect-3/4 w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="display-xl text-2xl">{g.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Styled Together" title="Complete the Look"
          description="Basketball jersey, shorts, layers and accessories — built as one outfit." />
        <ProductGrid items={completeLook} />
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Activities" title="Shop by Activity" />
        <div className="flex flex-wrap gap-3">
          {activities.map((a) => (
            <Link key={a} to="/shop" search={{ activity: a }} className="eyebrow border border-border px-5 py-3 transition-colors hover:bg-ink hover:text-ink-foreground">
              {a}
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Labels" title="Featured Brands"
          action={<Link to="/brands" className="eyebrow rule-link">All Brands</Link>} />
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-6">
          {brands.map((b) => (
            <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} className="bg-background px-4 py-10 text-center transition-colors hover:bg-secondary">
              <span className="display-xl text-lg">{b.name}</span>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Kit Bag" title="Accessories"
          action={<Link to="/accessories" className="eyebrow rule-link">All Accessories</Link>} />
        <ProductGrid items={accessories} />
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Secondary" title="Select Footwear"
          description="A tight, curated edit to finish the outfit."
          action={<Link to="/footwear" className="eyebrow rule-link">View Footwear</Link>} />
        <ProductGrid items={footwear} />
      </Container>

      <Container className="py-16">
        <SectionHeader eyebrow="Journal" title="IRIS Sport Edit"
          action={<Link to="/sport-edit" className="eyebrow rule-link">Read More</Link>} />
        <div className="grid gap-6 md:grid-cols-4">
          {editorial.map((e) => (
            <Link key={e.slug} to="/sport-edit" className="group">
              <img src={e.image} alt={e.title} loading="lazy" width={1600} height={1104} className="aspect-4/3 w-full object-cover" />
              <h3 className="mt-4 font-sans text-sm font-medium">{e.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{e.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>

      <Newsletter />
    </>
  );
}
