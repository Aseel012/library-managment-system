import Link from "next/link";
import type { ReactNode } from "react";

export function Section({ children, first, last }: { children: ReactNode; first?: boolean; last?: boolean }) {
  return (
    <div className={`row ${first ? "row--first" : ""} ${last ? "row--last" : ""}`}>
      <div className="col">{children}</div>
    </div>
  );
}

export function Gap() {
  return (
    <Section>
      <div className="row-gap" />
    </Section>
  );
}

export function SectionHeader({ title, viewAllHref }: { title: string; viewAllHref?: string }) {
  return (
    <div className="s-header-row">
      <h2 className="s-title">{title}</h2>
      {viewAllHref && (
        <Link href={viewAllHref} className="view-all">
          View all
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export function PageHero({ title, desc }: { title: string; desc: string }) {
  return (
    <Section first>
      <div className="page-hero">
        <Link href="/" className="back">
          ← Back
        </Link>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </Section>
  );
}
