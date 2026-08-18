import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1560px] px-5 md:px-10 ${className}`}>{children}</div>;
}

export function SectionHeader({
  eyebrow, title, description, action,
}: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div>
        {eyebrow && <p className="eyebrow text-muted-foreground">{eyebrow}</p>}
        <h2 className="display-xl mt-2 text-3xl md:text-5xl">{title}</h2>
        {description && <p className="mt-3 max-w-xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function TextLink({ to, children }: { to: LinkProps["to"]; children: ReactNode }) {
  return (
    <Link to={to} className="eyebrow rule-link">
      {children}
    </Link>
  );
}
