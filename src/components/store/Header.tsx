import { Link, type LinkProps } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Container } from "./Section";
import { sports, clothingCategories, brands } from "@/data/catalog";
import { useStore } from "@/lib/store";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SearchOverlay } from "./SearchOverlay";

const megaColumns = [
  ["basketball", "football"],
  ["soccer", "running"],
  ["training", "gym"],
  ["tennis", "outdoor"],
];

const primaryNav: { label: string; to: LinkProps["to"] }[] = [
  { label: "New In", to: "/new-in" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Kids", to: "/kids" },
];

const secondaryNav: { label: string; to: LinkProps["to"] }[] = [
  { label: "Clothing", to: "/clothing" },
  { label: "Accessories", to: "/accessories" },
  { label: "Brands", to: "/brands" },
  { label: "Sale", to: "/sale" },
];

export function Header() {
  const { count, setCartOpen, wishlist } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-ink text-ink-foreground">
        <Container>
          <p className="eyebrow flex items-center justify-center gap-3 py-2.5 text-center text-[10px]">
            Free standard shipping on US orders over $75 · Easy 30-day returns
          </p>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 md:h-20">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button type="button" aria-label="Open menu" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] overflow-y-auto p-0 sm:w-96">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <MobileNav onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>

              <Link to="/" className="display-xl text-2xl tracking-[0.3em] md:text-3xl">
                IRIS
              </Link>
            </div>

            <nav className="hidden items-center gap-7 lg:flex">
              {primaryNav.map((n) => (
                <Link key={n.label} to={n.to} className="eyebrow rule-link" activeProps={{ className: "rule-link-active" }}>
                  {n.label}
                </Link>
              ))}

              <div className="group static">
                <Link to="/sports" className="eyebrow rule-link" activeProps={{ className: "rule-link-active" }}>
                  Shop by Sport
                </Link>
                <div className="invisible absolute left-0 right-0 top-full border-b border-border bg-background opacity-0 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.5)] transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                  <Container>
                    <div className="grid grid-cols-4 gap-10 py-10">
                      {megaColumns.map((col, i) => (
                        <div key={i} className="space-y-8">
                          {col.map((slug) => {
                            const sport = sports.find((s) => s.slug === slug)!;
                            return (
                              <div key={slug}>
                                <Link
                                  to="/sports/$sport"
                                  params={{ sport: sport.slug }}
                                  className="eyebrow rule-link"
                                >
                                  {sport.name}
                                </Link>
                                <ul className="mt-3 space-y-1.5">
                                  {sport.subcategories.slice(0, 6).map((sub) => (
                                    <li key={sub}>
                                      <Link
                                        to="/sports/$sport"
                                        params={{ sport: sport.slug }}
                                        search={{ type: sub }}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                      >
                                        {sub}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-border py-5">
                      <Link to="/sports" className="eyebrow rule-link">Shop All Sports</Link>
                      <Link to="/footwear" className="text-xs text-muted-foreground hover:text-foreground">
                        Footwear
                      </Link>
                    </div>
                  </Container>
                </div>
              </div>

              {secondaryNav.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className={`eyebrow rule-link ${n.label === "Sale" ? "text-sale" : ""}`}
                  activeProps={{ className: "rule-link-active" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 md:gap-5">
              <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </button>
              <Link to="/account" aria-label="Account" className="hidden md:block">
                <User className="h-5 w-5" />
              </Link>
              <Link to="/wishlist" aria-label="Wishlist" className="relative hidden md:block">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center bg-ink px-1 text-[10px] text-ink-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button type="button" aria-label="Open bag" className="relative" onClick={() => setCartOpen(true)}>
                <ShoppingBag className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center bg-ink px-1 text-[10px] text-ink-foreground">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [tab, setTab] = useState<"main" | "sports" | "clothing">("main");
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <span className="display-xl text-xl tracking-[0.3em]">IRIS</span>
        <button type="button" onClick={onNavigate} aria-label="Close menu"><X className="h-5 w-5" /></button>
      </div>

      {tab === "main" && (
        <nav className="mt-8 space-y-4">
          {primaryNav.map((n) => (
            <Link key={n.label} to={n.to} onClick={onNavigate} className="block text-lg">{n.label}</Link>
          ))}
          <button type="button" onClick={() => setTab("sports")} className="block text-lg">Shop by Sport</button>
          <button type="button" onClick={() => setTab("clothing")} className="block text-lg">Clothing</button>
          {secondaryNav.filter((n) => n.label !== "Clothing").map((n) => (
            <Link key={n.label} to={n.to} onClick={onNavigate} className="block text-lg">{n.label}</Link>
          ))}
          <Link to="/footwear" onClick={onNavigate} className="block text-lg text-muted-foreground">Footwear</Link>
          <Link to="/sport-edit" onClick={onNavigate} className="block text-lg text-muted-foreground">IRIS Sport Edit</Link>
        </nav>
      )}

      {tab === "sports" && (
        <nav className="mt-8 space-y-3">
          <button type="button" onClick={() => setTab("main")} className="eyebrow text-muted-foreground">← Back</button>
          {sports.map((s) => (
            <Link key={s.slug} to="/sports/$sport" params={{ sport: s.slug }} onClick={onNavigate} className="block text-lg">
              {s.name}
            </Link>
          ))}
        </nav>
      )}

      {tab === "clothing" && (
        <nav className="mt-8 space-y-3">
          <button type="button" onClick={() => setTab("main")} className="eyebrow text-muted-foreground">← Back</button>
          {clothingCategories.map((c) => (
            <Link key={c.slug} to="/clothing/$category" params={{ category: c.slug }} onClick={onNavigate} className="block text-lg">
              {c.name}
            </Link>
          ))}
        </nav>
      )}

      <div className="mt-10 border-t border-border pt-6">
        <p className="eyebrow text-muted-foreground">Brands</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {brands.map((b) => (
            <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} onClick={onNavigate} className="text-sm text-muted-foreground">
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
