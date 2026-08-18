import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { clothingCategories, products } from "@/data/catalog";

export const Route = createFileRoute("/clothing/$category")({
  loader: ({ params }) => {
    const cat = clothingCategories.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found | IRIS" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Sports Clothing | IRIS`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.blurb} Shop IRIS ${loaderData.name.toLowerCase()} for men, women and kids across every sport, priced in USD.` },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.blurb },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = Route.useLoaderData();
  return (
    <CatalogView
      eyebrow="Clothing"
      title={cat.name}
      description={cat.blurb}
      items={products.filter((p) => p.typeSlug === category)}
    />
  );
}

function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="display-xl text-4xl">Category not found</h1>
      <Link to="/clothing" className="eyebrow rule-link mt-6 inline-block">Shop all clothing</Link>
    </div>
  );
}
