import { createFileRoute } from "@tanstack/react-router";
import { GenderPage } from "@/components/store/GenderPage";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women's Sports Clothing — Leggings, Bras & Tops | IRIS" },
      { name: "description", content: "Shop women's sports clothing at IRIS: running leggings, sports bras, performance tops, shorts, hoodies and tracksuits in USD." },
      { property: "og:title", content: "Women's Sports Clothing | IRIS" },
      { property: "og:description", content: "Women's performance apparel across running, training, gym, tennis and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GenderPage gender="women" title="Women's Sports Clothing" />,
});
