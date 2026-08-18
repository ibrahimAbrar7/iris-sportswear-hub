import { createFileRoute } from "@tanstack/react-router";
import { GenderPage } from "@/components/store/GenderPage";

export const Route = createFileRoute("/men")({
  head: () => ({
    meta: [
      { title: "Men's Sports Clothing — Jerseys, Tees & Joggers | IRIS" },
      { name: "description", content: "Shop men's sports clothing at IRIS: basketball jerseys, training tees, shorts, hoodies, joggers, tracksuits and jackets in USD." },
      { property: "og:title", content: "Men's Sports Clothing | IRIS" },
      { property: "og:description", content: "Men's performance apparel across basketball, soccer, running, training and gym." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GenderPage gender="men" title="Men's Sports Clothing" />,
});
