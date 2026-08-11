import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section, SectionHeader, Gap } from "@/components/Layout";
import { actors, movies, type MediaTile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Movies ",
  description: "Favourite cinema and actors.",
};

function Tile({ item }: { item: MediaTile }) {
  const isRemote = item.img.startsWith("http");
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      title={item.name}
      className="group flex flex-col gap-2"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-3)]">
        {isRemote ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.img} alt={item.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
        ) : (
          <Image src={item.img} alt={item.name} fill sizes="220px" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
        )}
      </div>
      <span className="text-[12.5px] font-medium text-center leading-snug">{item.name}</span>
    </a>
  );
}

export default function MoviesPage() {
  return (
    <main>
      <PageHero title="Movies & Actors" desc="Favourite cinema and actors I keep coming back to." />

      <Section>
        <SectionHeader title="Actors" />
      </Section>
      <Section>
        <div className="p-[var(--pad)] grid grid-cols-3 sm:grid-cols-4 gap-4">
          {actors.map((a) => (
            <Tile key={a.name} item={a} />
          ))}
        </div>
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Movies" />
      </Section>
      <Section last>
        <div className="p-[var(--pad)] grid grid-cols-3 sm:grid-cols-4 gap-4">
          {movies.map((m) => (
            <Tile key={m.name} item={m} />
          ))}
        </div>
      </Section>
    </main>
  );
}