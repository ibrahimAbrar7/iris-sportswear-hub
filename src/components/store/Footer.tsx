import { Link } from "@tanstack/react-router";
import { Container } from "./Section";
import { clothingCategories, sports } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-ink text-ink-foreground">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-4">
          <div>
            <p className="display-xl text-3xl tracking-[0.3em]">IRIS</p>
            <p className="mt-4 max-w-xs text-sm text-ink-foreground/70">
              Sport. Performance. Style. Premium sports clothing for every sport, every athlete and every day.
            </p>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/60">Shop by Sport</p>
            <ul className="mt-4 space-y-2 text-sm">
              {sports.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to="/sports/$sport" params={{ sport: s.slug }} className="text-ink-foreground/80 hover:text-ink-foreground">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/60">Clothing</p>
            <ul className="mt-4 space-y-2 text-sm">
              {clothingCategories.slice(0, 7).map((c) => (
                <li key={c.slug}>
                  <Link to="/clothing/$category" params={{ category: c.slug }} className="text-ink-foreground/80 hover:text-ink-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-ink-foreground/60">Help</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
              <li><Link to="/sport-edit">IRIS Sport Edit</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/footwear">Footwear</Link></li>
              <li><Link to="/sale">Sale</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/account">Account &amp; Orders</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-foreground/15 py-6 text-xs text-ink-foreground/60">
          <p>© {new Date().getFullYear()} IRIS. All prices in USD ($).</p>
          <p>Secure checkout · Easy returns · US shipping</p>
        </div>
      </Container>
    </footer>
  );
}
