import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Layout";
import FavouritesGrid from "@/components/FavouritesGrid";

export const metadata: Metadata = {
  title: "Favourites",
  description: "A curated collection of the sites, tools, and resources Shaikh Aseel loves.",
};

export default function FavouritesPage() {
  return (
    <main>
      <PageHero title="Favourites" desc="A curated collection of the sites, tools, resources, and creators I love." />
      <Section last>
        <FavouritesGrid />
      </Section>
    </main>
  );
}
