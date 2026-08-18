import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatUSD, inStock, type Product } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { toggleWish, wishlist, add, setCartOpen } = useStore();
  const [hover, setHover] = useState(false);
  const wished = wishlist.includes(product.slug);
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const quickAdd = () => {
    const size = product.sizes.find((s) => inStock(product, s)) ?? product.sizes[0];
    add(product, size, product.colors[0].name);
    setCartOpen(true);
    toast.success(`${product.name} added to bag`, { description: `Size ${size} · ${product.colors[0].name}` });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-4/5 overflow-hidden bg-secondary">
          <img
            src={hover ? product.hoverImage : product.image}
            alt={`${product.name} — ${product.type} by ${product.brand}`}
            loading={priority ? "eager" : "lazy"}
            width={900}
            height={1100}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.isNew && <span className="eyebrow bg-ink px-2 py-1 text-ink-foreground">New</span>}
            {product.isBestseller && !product.isNew && (
              <span className="eyebrow bg-background px-2 py-1 text-foreground">Bestseller</span>
            )}
            {discount > 0 && (
              <span className="eyebrow bg-sale px-2 py-1 text-primary-foreground">-{discount}%</span>
            )}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWish(product.slug)}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-background/80 backdrop-blur transition-colors hover:bg-background"
      >
        <Heart className={cn("h-4 w-4", wished && "fill-current")} />
      </button>

      <button
        type="button"
        onClick={quickAdd}
        className="eyebrow absolute bottom-[6.5rem] left-3 right-3 hidden bg-ink py-3 text-ink-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
      >
        Quick Add
      </button>

      <div className="pt-3">
        <p className="eyebrow text-muted-foreground">{product.brand}</p>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="mt-1 font-sans text-sm font-medium leading-snug">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-baseline gap-2 text-sm">
          {product.salePrice ? (
            <>
              <span className="font-medium text-sale">{formatUSD(product.salePrice)}</span>
              <span className="text-muted-foreground line-through">{formatUSD(product.price)}</span>
            </>
          ) : (
            <span className="font-medium">{formatUSD(product.price)}</span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">{product.colors.length} colors</span>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ items, cols = 4 }: { items: Product[]; cols?: 3 | 4 }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6",
        cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {items.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
