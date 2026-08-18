import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Check, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Container, SectionHeader } from "@/components/store/Section";
import { ProductGrid } from "@/components/store/ProductCard";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { bySlug, completeTheLook, formatUSD, products } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = bySlug(params.slug);
    if (!p) throw notFound();
    return { name: p.name, brand: p.brand, description: p.description, sku: p.sku, price: p.salePrice ?? p.price };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | IRIS" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — ${loaderData.brand} | IRIS`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.name,
            brand: { "@type": "Brand", name: loaderData.brand },
            sku: loaderData.sku,
            description: loaderData.description,
            offers: {
              "@type": "Offer",
              price: loaderData.price.toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductNotFound,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = products.find((p) => p.slug === slug)!;
  const { add, setCartOpen, toggleWish, wishlist } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  const price = product.salePrice ?? product.price;
  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
  const stock = size ? product.stock[size] ?? 0 : null;
  const wished = wishlist.includes(product.slug);

  const addToBag = (thenCheckout = false) => {
    if (!size) { toast.error("Select a size first"); return; }
    add(product, size, color, qty);
    if (thenCheckout) { window.location.href = "/checkout"; return; }
    setCartOpen(true);
    toast.success(`${product.name} added to bag`);
  };

  return (
    <>
      <Container className="py-6">
        <nav className="eyebrow flex flex-wrap gap-2 text-muted-foreground">
          <Link to="/">Home</Link><span>/</span>
          <Link to="/sports/$sport" params={{ sport: product.sport }} className="capitalize">{product.sport}</Link><span>/</span>
          <span className="text-foreground">{product.type}</span>
        </nav>
      </Container>

      <Container className="grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="no-scrollbar flex snap-x gap-2 overflow-x-auto lg:hidden">
            {product.gallery.map((g, i) => (
              <img key={i} src={g} alt={`${product.name} view ${i + 1}`} width={900} height={1100} className="aspect-4/5 w-[85vw] shrink-0 snap-center object-cover" />
            ))}
          </div>
          <div className="hidden gap-3 lg:flex">
            <div className="flex w-20 shrink-0 flex-col gap-3">
              {product.gallery.map((g, i) => (
                <button key={i} type="button" onClick={() => setActive(i)} className={cn("aspect-4/5 overflow-hidden border", active === i ? "border-foreground" : "border-transparent")}>
                  <img src={g} alt={`${product.name} thumbnail ${i + 1}`} loading="lazy" width={80} height={100} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <img src={product.gallery[active]} alt={`${product.name} — ${["front", "back", "detail", "model"][active] ?? "view"}`} width={900} height={1100} className="aspect-4/5 flex-1 object-cover" />
          </div>
        </div>

        <div className="lg:pt-4">
          <p className="eyebrow text-muted-foreground">{product.brand}</p>
          <h1 className="display-xl mt-2 text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-2 text-xs text-muted-foreground">No reviews yet · SKU {product.sku}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className={cn("text-2xl", product.salePrice && "text-sale")}>{formatUSD(price)}</span>
            {product.salePrice && (
              <>
                <span className="text-muted-foreground line-through">{formatUSD(product.price)}</span>
                <span className="eyebrow bg-sale px-2 py-1 text-primary-foreground">-{discount}%</span>
              </>
            )}
          </div>

          <div className="mt-8">
            <p className="eyebrow">Color — {color}</p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name} type="button" title={c.name} onClick={() => setColor(c.name)}
                  className={cn("h-9 w-9 rounded-full border-2", color === c.name ? "border-foreground" : "border-border")}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Size {product.department === "clothing" && `· ${product.fit}`}</p>
              <button type="button" className="text-xs underline" onClick={() => toast("Size guide", { description: "XS–XXXL, US sizing. Model wears M." })}>
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const out = (product.stock[s] ?? 0) === 0;
                return (
                  <button
                    key={s} type="button" disabled={out} onClick={() => setSize(s)}
                    className={cn(
                      "min-w-14 border px-4 py-3 text-sm transition-colors",
                      size === s ? "border-foreground bg-ink text-ink-foreground" : "border-border hover:border-foreground",
                      out && "cursor-not-allowed text-muted-foreground line-through opacity-50",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {size && (
              <p className="mt-3 text-xs text-muted-foreground">
                {stock === 0 ? "Out of stock" : stock! <= 5 ? `Low stock — only ${stock} left` : "In stock"}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button type="button" className="px-3 py-3" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button type="button" className="px-3 py-3" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button type="button" onClick={() => toggleWish(product.slug)} className="flex items-center gap-2 border border-border px-4 py-3 text-xs">
              <Heart className={cn("h-4 w-4", wished && "fill-current")} /> {wished ? "Saved" : "Wishlist"}
            </button>
          </div>

          <div className="mt-5 hidden gap-3 md:flex">
            <button type="button" onClick={() => addToBag()} className="eyebrow flex-1 bg-ink py-4 text-ink-foreground">Add to Bag</button>
            <button type="button" onClick={() => addToBag(true)} className="eyebrow flex-1 border border-foreground py-4">Buy Now</button>
          </div>

          <ul className="mt-8 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free US shipping over $75</li>
            <li className="flex items-center gap-2"><RotateCcw className="h-4 w-4" /> 30-day returns</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secure checkout</li>
          </ul>

          <Accordion type="single" collapsible className="mt-10" defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger className="eyebrow">Description</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="features">
              <AccordionTrigger className="eyebrow">Performance Features</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" />{f}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="material">
              <AccordionTrigger className="eyebrow">Material &amp; Care</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {product.materials.join(" · ")}. Machine wash cold, hang dry.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit">
              <AccordionTrigger className="eyebrow">Size &amp; Fit</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {product.fit}. US sizing, {product.sizes.join(" / ")}.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="eyebrow">Shipping &amp; Returns</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Standard US shipping, free over $75. Returns accepted within 30 days in original condition.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>

      <Container className="pb-16">
        <SectionHeader eyebrow="Styled With" title="Complete the Look"
          description="Clothing and accessories that finish this outfit." />
        <ProductGrid items={completeTheLook(product)} />
      </Container>

      <Container className="pb-24">
        <SectionHeader title="Reviews" />
        <p className="text-sm text-muted-foreground">
          No reviews yet for this product. Verified customer reviews appear here after purchase.
        </p>
      </Container>

      <div className="sticky bottom-0 z-40 flex gap-2 border-t border-border bg-background p-3 md:hidden">
        <button type="button" onClick={() => addToBag()} className="eyebrow flex-1 bg-ink py-4 text-ink-foreground">Add to Bag</button>
        <button type="button" onClick={() => addToBag(true)} className="eyebrow flex-1 border border-foreground py-4">Buy Now</button>
      </div>
    </>
  );
}

function ProductNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="display-xl text-4xl">Product not found</h1>
      <Link to="/shop" className="eyebrow rule-link mt-6 inline-block">Shop all products</Link>
    </div>
  );
}
