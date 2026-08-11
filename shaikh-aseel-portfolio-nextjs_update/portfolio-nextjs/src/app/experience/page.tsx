import type { Metadata } from "next";
import { PageHero, Section, SectionHeader, Gap } from "@/components/Layout";
import { experience, education } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history, freelance projects, and education of Shaikh Aseel.",
};

export default function ExperiencePage() {
  return (
    <main>
      <PageHero title="Experience" desc="My work history, freelance projects, and education." />

      <Section>
        <SectionHeader title="Work Experience" />
      </Section>
      <Section>
        <div className="p-[var(--pad)]">
          <ol className="relative flex flex-col gap-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[var(--border)]">
            {experience.map((item) => (
              <li key={item.role} className="relative pl-8">
                <span
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg)] ${
                    item.current ? "bg-[var(--accent)]" : "bg-[var(--muted)]"
                  }`}
                />
                <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="text-[15px] font-semibold">{item.role}</h3>
                      <p className="text-[13px] text-[var(--muted)] mt-0.5">
                        {item.org} · {item.location}
                      </p>
                    </div>
                    <span className="text-[12px] font-mono text-[var(--muted)] shrink-0">{item.when}</span>
                  </div>
                  <p className="text-[13.5px] leading-relaxed mt-3 text-[var(--text)]">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Education" />
      </Section>
      <Section last>
        <div className="p-[var(--pad)]">
          <div className="rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] p-5 flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-[15px] font-semibold">{education.degree}</h3>
              <p className="text-[13px] text-[var(--muted)] mt-0.5">{education.school}</p>
              <p className="text-[13px] text-[var(--muted)] mt-2">{education.note}</p>
            </div>
            <span className="text-[12px] font-mono text-[var(--muted)] shrink-0">{education.when}</span>
          </div>
        </div>
      </Section>
    </main>
  );
}
