import { useState } from "react";
import { toast } from "sonner";
import { Container } from "./Section";

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="border-y border-border bg-secondary py-16">
      <Container className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow text-muted-foreground">IRIS Newsletter</p>
          <h2 className="display-xl mt-3 text-3xl md:text-4xl">New clothing drops, first.</h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Sport-by-sport arrivals, restocks and edits — straight to your inbox.
          </p>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setEmail(""); toast.success("You're on the list."); }}
          className="flex items-center gap-0 border-b border-foreground"
        >
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full bg-transparent py-3 outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="eyebrow whitespace-nowrap px-4 py-3">Sign up</button>
        </form>
      </Container>
    </section>
  );
}
