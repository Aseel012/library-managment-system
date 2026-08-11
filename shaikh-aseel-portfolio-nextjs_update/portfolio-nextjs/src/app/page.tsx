import Image from "next/image";
import Link from "next/link";
import VideoBanner from "@/components/VideoBanner";
import ContactPills from "@/components/ContactPills";
import ProjectCard from "@/components/ProjectCard";
import GithubActivity from "@/components/GithubActivity";
import TechStack from "@/components/TechStack";
import { Section, Gap, SectionHeader } from "@/components/Layout";
import { projects, highlights } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <VideoBanner />

      <Section>
        <div className="flex items-center gap-4 p-[var(--pad)]">
          <div className="relative shrink-0">
            <div className="avatar-square w-[80px] h-[80px]">
              <Image src="/images/avatar.jpg" alt="Shaikh Aseel" width={80} height={80} className="w-full h-full object-cover" priority />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--green)] border-2 border-[var(--bg)]" title="Available for work" />
          </div>
          <div>
            <h1 className="font-serif text-[25px] font-bold leading-tight">Shaikh Aseel</h1>
            <p className="text-[14.5px] font-semibold mt-0.5">Product-Focused Software Developer</p>
            <p className="text-[12.5px] text-[var(--muted)] mt-1.5 flex items-center gap-1.5">
              <span aria-hidden>🇮🇳</span> India
            </p>
          </div>
        </div>
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="About" />
      </Section>
      <Section>
        <div className="p-[var(--pad)] flex flex-col gap-3 text-[14.5px] leading-relaxed">
          <p>
            I&apos;m a <strong>Product-Focused Software Developer</strong> passionate about creating software that is simple, scalable, and genuinely useful.
          </p>
          <p className="text-[var(--muted)]">
            My interests span full-stack development, AI, automation, and developer tools. I enjoy building products from the ground up, writing maintainable code, and refining every detail to deliver fast, intuitive user experiences.
          </p>
          <p className="text-[var(--muted)]">
            Currently a 3rd-year B.Tech Information Technology student, I&apos;m committed to continuous learning through real-world projects, exploring emerging technologies, and solving meaningful engineering challenges one product at a time.
          </p>
        </div>
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Contact" />
      </Section>
      <Section>
        <ContactPills />
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Projects" viewAllHref="/projects" />
      </Section>
      <Section>
        <div className="p-[var(--pad)] grid gap-3 sm:grid-cols-2">
          {projects.slice(0, 4).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      <Gap />

      <Section>
        <TechStack />
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="GitHub Activity" />
      </Section>
      <Section>
        <div className="p-[var(--pad)]">
          <GithubActivity />
        </div>
      </Section>

      <Gap />

      <Section>
        <SectionHeader title="Highlights" />
      </Section>
      <Section>
        <div className="p-[var(--pad)] flex flex-col gap-5">
          {highlights.map((h) => (
            <div key={h.title} className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              <div>
                <a href={h.href} target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold hover:text-[var(--accent)]">
                  {h.title} ↗
                </a>
                <p className="text-[13px] text-[var(--muted)] mt-1 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="p-[var(--pad)] py-14 text-center flex flex-col items-center gap-3">
          <h2 className="font-serif text-[26px] font-bold">Scrolled Too Far</h2>
          <p className="text-[14px] text-[var(--muted)] max-w-sm">If you&apos;ve read this far, you might be interested in what I do.</p>
          <a href="mailto:shaikhmdaseel@gmail.com" className="mt-1 inline-flex items-center gap-2 rounded-full bg-[var(--text)] text-[var(--bg)] font-semibold text-[13.5px] px-5 py-2.5">
            Let&apos;s Talk →
          </a>
        </div>
      </Section>

      <Section>
        <div className="p-[var(--pad)] py-10 flex flex-col items-center text-center gap-3">
          <Image src="/images/luffy.jpg" alt="Monkey D. Luffy" width={52} height={52} className="rounded-full object-cover border border-[var(--border)]" />
          <p className="font-serif text-[19px] leading-snug max-w-md">&ldquo;As long as I&apos;m alive, there are infinite chances!&rdquo;</p>
          <p className="text-[12px] text-[var(--muted)]">Monkey D. Luffy — One Piece</p>
        </div>
      </Section>
    </main>
  );
}