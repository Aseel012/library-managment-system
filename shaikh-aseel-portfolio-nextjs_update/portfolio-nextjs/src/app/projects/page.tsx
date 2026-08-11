import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { PageHero, Section } from "@/components/Layout";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Shaikh Aseel — AI tools, web apps, APIs, and more.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageHero title="All Projects" desc="Everything I've built — AI tools, web apps, APIs, and more." />
      <Section last>
        <div className="p-[var(--pad)] grid gap-3 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>
    </main>
  );
}
