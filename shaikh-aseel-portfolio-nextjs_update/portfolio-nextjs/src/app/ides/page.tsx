import type { Metadata } from "next";
import { PageHero, Section, SectionHeader, Gap } from "@/components/Layout";
import { codeEditors, designTools, devTools, type IdeTile } from "@/lib/data";

export const metadata: Metadata = {
  title: "IDEs & Tools",
  description: "The developer toolkit and software Shaikh Aseel uses every day.",
};

function TileGrid({ items }: { items: IdeTile[] }) {
  return (
    <div className="p-[var(--pad)] flex flex-wrap gap-2.5">
      {items.map((t) => (
        <div
          key={t.name}
          title={t.name}
          className="relative flex items-center gap-2 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] px-3.5 py-2.5 text-[13px] font-semibold"
        >
          {t.pinned && (
            <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5">
              <line x1="12" y1="17" x2="12" y2="22" />
              <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 11.24V6a3 3 0 0 0-3-3h0a3 3 0 0 0-3 3v5.24a2 2 0 0 1-1.11 1.31l-1.78.9A2 2 0 0 0 5 15.24Z" />
            </svg>
          )}
          <span className="text-[16px]" aria-hidden>
            {t.emoji}
          </span>
          <span>{t.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function IdesPage() {
  return (
    <main>
      <PageHero title="IDEs &amp; Tools" desc="The developer toolkit and software I use every day to build and design." />

      <Section>
        <SectionHeader title="Code Editors" />
      </Section>
      <Section>
        <TileGrid items={codeEditors} />
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Design Tools" />
      </Section>
      <Section>
        <TileGrid items={designTools} />
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Dev Tools & Services" />
      </Section>
      <Section last>
        <TileGrid items={devTools} />
      </Section>
    </main>
  );
}
