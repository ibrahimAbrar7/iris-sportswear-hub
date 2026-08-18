import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/store/Section";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account & Orders | IRIS" },
      { name: "description", content: "Sign in to track IRIS orders, manage addresses and review your saved sports clothing." },
      { property: "og:title", content: "Account & Orders | IRIS" },
      { property: "og:description", content: "Track orders and manage your IRIS account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Container className="py-20">
      <h1 className="display-xl text-4xl md:text-6xl">Account</h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        Accounts and order tracking connect once a backend is enabled. Your bag and wishlist are saved on this device in the meantime.
      </p>
    </Container>
  ),
});
