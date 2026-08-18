import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { brands, products } from "@/data/catalog";

export const Route = createFileRoute("/brands/$brand")({
  loader: ({ params }) => {
    const brand = brands.find((b) => b.slug === params.brand);
    if (!brand) throw notFound();
    return brand;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Brand not found | IRIS" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Sports Clothing Collection | IRIS`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.blurb} Shop the ${loaderData.name} clothing collection at IRIS.` },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.blurb },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BrandPage,
  notFoundComponent: BrandNotFound,
});

function BrandPage() {
  const brand = Route.useLoaderData();
  return (
    <CatalogView
      eyebrow="Brand"
      title={brand.name}
      description={brand.blurb}
      items={products.filter((p) => p.brand === brand.name)}
      hideFacets={["brand"]}
    />
  );
}

function BrandNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="display-xl text-4xl">Brand not found</h1>
      <Link to="/brands" className="eyebrow rule-link mt-6 inline-block">All brands</Link>
    </div>
  );
}
