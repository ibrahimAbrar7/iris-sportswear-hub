import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CatalogView } from "@/components/store/CatalogView";
import { products, sports } from "@/data/catalog";

export const Route = createFileRoute("/sports/$sport")({
  validateSearch: (s: Record<string, unknown>) => ({ type: (s.type as string) || undefined }),
  loader: ({ params }) => {
    const sport = sports.find((s) => s.slug === params.sport);
    if (!sport) throw notFound();
    return { name: sport.name, blurb: sport.blurb };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Sport not found | IRIS" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} Clothing — Jerseys, Tops & Shorts | IRIS`;
    return {
      meta: [
        { title },
        { name: "description", content: `Shop ${loaderData.name.toLowerCase()} clothing at IRIS: ${loaderData.blurb} Men's, women's and kids' apparel in USD.` },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.blurb },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "keywords", content: `${params.sport} jerseys, ${params.sport} shorts, ${params.sport} clothing` },
      ],
    };
  },
  component: SportPage,
  notFoundComponent: SportNotFound,
});

function SportPage() {
  const { sport } = Route.useParams();
  const { type } = Route.useSearch();
  const data = Route.useLoaderData();
  let items = products.filter((p) => p.sport === sport);
  if (type) {
    const t = type.toLowerCase();
    items = items.filter((p) => p.type.toLowerCase() === t || p.typeSlug === t.replace(/\s+/g, "-"));
    if (items.length === 0) items = products.filter((p) => p.sport === sport);
  }
  const meta = sports.find((s) => s.slug === sport)!;

  return (
    <CatalogView
      eyebrow="Shop by Sport"
      title={`${data.name} Clothing`}
      description={data.blurb}
      items={items}
      hideFacets={["sport"]}
      intro={
        <div className="mt-6 flex flex-wrap gap-2">
          {meta.subcategories.map((sub) => (
            <Link key={sub} to="/sports/$sport" params={{ sport }} search={{ type: sub }} className="border border-border px-3 py-1.5 text-xs transition-colors hover:bg-secondary">
              {sub}
            </Link>
          ))}
        </div>
      }
    />
  );
}

function SportNotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="display-xl text-4xl">Sport not found</h1>
      <Link to="/sports" className="eyebrow rule-link mt-6 inline-block">Shop all sports</Link>
    </div>
  );
}
