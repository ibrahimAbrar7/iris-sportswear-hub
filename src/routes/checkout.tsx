import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Container } from "@/components/store/Section";
import { bySlug, formatUSD } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | IRIS" },
      { name: "description", content: "Secure IRIS checkout for US orders. All totals shown in USD." },
      { property: "og:title", content: "Checkout | IRIS" },
      { property: "og:description", content: "Fast, secure US checkout in USD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const field = "w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-foreground";

function Checkout() {
  const { lines, subtotal } = useStore();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.95;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  return (
    <Container className="py-14">
      <h1 className="display-xl text-4xl md:text-5xl">Checkout</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            toast("Payments not connected yet", { description: "Enable a payment provider to accept live USD orders." });
          }}
        >
          <section>
            <h2 className="eyebrow border-b border-border pb-3">Customer Information</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input required placeholder="First name" className={field} />
              <input required placeholder="Last name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <input required type="tel" placeholder="Phone" className={field} />
            </div>
          </section>
          <section>
            <h2 className="eyebrow border-b border-border pb-3">Shipping Address</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Address" className={`${field} sm:col-span-2`} />
              <input placeholder="Apartment / Suite" className={`${field} sm:col-span-2`} />
              <input required placeholder="City" className={field} />
              <input required placeholder="State" className={field} />
              <input required placeholder="ZIP code" className={field} />
              <input value="United States" readOnly className={field} />
            </div>
          </section>
          <section>
            <h2 className="eyebrow border-b border-border pb-3">Payment</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Card payment appears here once a payment provider is connected. Orders are charged in USD.
            </p>
          </section>
          <button type="submit" className="eyebrow w-full bg-ink py-4 text-ink-foreground">
            Place order — {formatUSD(total)}
          </button>
        </form>

        <aside className="h-fit border border-border p-6">
          <h2 className="eyebrow border-b border-border pb-3">Order Summary</h2>
          {lines.length === 0 ? (
            <p className="mt-5 text-sm text-muted-foreground">
              Your bag is empty. <Link to="/clothing" className="underline">Shop clothing</Link>.
            </p>
          ) : (
            <ul className="mt-5 space-y-4">
              {lines.map((l) => {
                const p = bySlug(l.slug);
                if (!p) return null;
                return (
                  <li key={`${l.slug}-${l.size}-${l.color}`} className="flex gap-3 text-sm">
                    <img src={p.image} alt={p.name} loading="lazy" width={56} height={70} className="h-[70px] w-14 object-cover" />
                    <div className="flex-1">
                      <p>{p.name}</p>
                      <p className="text-xs text-muted-foreground">Size {l.size} · {l.color} · Qty {l.qty}</p>
                    </div>
                    <span>{formatUSD((p.salePrice ?? p.price) * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <dl className="mt-6 space-y-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatUSD(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatUSD(shipping)}</dd></div>
            <div className="flex justify-between"><dt>Estimated tax</dt><dd>{formatUSD(tax)}</dd></div>
            <div className="flex justify-between border-t border-border pt-2 font-medium"><dt>Total (USD)</dt><dd>{formatUSD(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </Container>
  );
}
