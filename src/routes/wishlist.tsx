import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/store/Section";
import { ProductGrid } from "@/components/store/ProductCard";
import { products } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | IRIS" },
      { name: "description", content: "Your saved IRIS sports clothing, accessories and footwear." },
      { property: "og:title", content: "Wishlist | IRIS" },
      { property: "og:description", content: "Saved IRIS pieces, ready when you are." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.slug));
  return (
    <Container className="py-14">
      <h1 className="display-xl text-4xl md:text-6xl">Wishlist</h1>
      <p className="mt-3 text-sm text-muted-foreground">{items.length} saved pieces.</p>
      <div className="mt-10">
        {items.length === 0
          ? <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
          : <ProductGrid items={items} />}
      </div>
    </Container>
  );
}
