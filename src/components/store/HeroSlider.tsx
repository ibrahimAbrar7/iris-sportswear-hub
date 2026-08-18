import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Container } from "./Section";
import { heroSlides } from "@/data/catalog";

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate h-[72vh] min-h-[520px] w-full overflow-hidden bg-ink text-ink-foreground">
      {heroSlides.map((s, idx) => (
        <img
          key={s.sport}
          src={s.image}
          alt={`${s.eyebrow} athlete wearing IRIS performance apparel`}
          width={1600}
          height={1104}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      <Container className="relative flex h-full flex-col justify-end pb-14 md:pb-20">
        <p className="eyebrow text-ink-foreground/80">{heroSlides[i].eyebrow}</p>
        <h1 className="display-xl mt-3 max-w-3xl text-4xl sm:text-6xl lg:text-7xl">
          {heroSlides[i].title}
        </h1>
        <p className="mt-4 max-w-lg text-sm text-ink-foreground/85 md:text-base">{heroSlides[i].copy}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/sports/$sport"
            params={{ sport: heroSlides[i].sport }}
            className="eyebrow bg-background px-7 py-4 text-foreground"
          >
            {heroSlides[i].cta}
          </Link>
          <Link to="/clothing" className="eyebrow border border-ink-foreground/60 px-7 py-4">
            Shop Sports Clothing
          </Link>
        </div>

        <div className="mt-10 flex gap-2">
          {heroSlides.map((s, idx) => (
            <button
              key={s.sport}
              type="button"
              aria-label={`Show ${s.eyebrow} slide`}
              onClick={() => setI(idx)}
              className={`h-0.5 w-12 transition-colors ${idx === i ? "bg-ink-foreground" : "bg-ink-foreground/30"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
