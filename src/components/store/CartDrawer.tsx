import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { bySlug, formatUSD, products } from "@/data/catalog";
import { useStore } from "@/lib/store";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, setQty, remove, subtotal, add } = useStore();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.95;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;
  const crossSell = products.filter((p) => p.department !== "footwear" && p.isFeatured).slice(0, 3);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetTitle className="sr-only">Shopping bag</SheetTitle>
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="eyebrow">Your Bag ({lines.length})</p>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close bag">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">Your bag is empty.</p>
              <Link to="/clothing" onClick={() => setCartOpen(false)} className="eyebrow rule-link mt-4 inline-block">
                Shop Sports Clothing
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {lines.map((l) => {
                const p = bySlug(l.slug);
                if (!p) return null;
                return (
                  <li key={`${l.slug}-${l.size}-${l.color}`} className="flex gap-4 py-5">
                    <img src={p.image} alt={p.name} loading="lazy" width={80} height={100} className="h-25 w-20 object-cover" />
                    <div className="flex-1">
                      <p className="eyebrow text-muted-foreground">{p.brand}</p>
                      <p className="text-sm">{p.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Size {l.size} · {l.color}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center border border-border">
                          <button type="button" className="px-2 py-1" onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)} aria-label="Decrease quantity">−</button>
                          <span className="w-7 text-center text-sm">{l.qty}</span>
                          <button type="button" className="px-2 py-1" onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <button type="button" className="text-xs text-muted-foreground underline" onClick={() => remove(l.slug, l.size, l.color)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className="text-sm">{formatUSD((p.salePrice ?? p.price) * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {lines.length > 0 && (
            <div className="border-t border-border py-6">
              <p className="eyebrow text-muted-foreground">Complete your look</p>
              <ul className="mt-4 space-y-4">
                {crossSell.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} loading="lazy" width={48} height={60} className="h-15 w-12 object-cover" />
                    <span className="flex-1 text-sm">{p.name}</span>
                    <button
                      type="button"
                      className="eyebrow border border-foreground px-2 py-1"
                      onClick={() => add(p, p.sizes[1] ?? p.sizes[0], p.colors[0].name)}
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatUSD(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatUSD(shipping)}</dd></div>
              <div className="flex justify-between"><dt>Estimated tax</dt><dd>{formatUSD(tax)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 font-medium"><dt>Total (USD)</dt><dd>{formatUSD(total)}</dd></div>
            </dl>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="eyebrow mt-5 block bg-ink py-4 text-center text-ink-foreground"
            >
              Checkout
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
