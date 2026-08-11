import Image from "next/image";
import type { Project } from "@/lib/data";

const ACCENT: Record<Project["accent"], { from: string; to: string }> = {
  blue: { from: "#4a7bff", to: "#1d3fa3" },
  teal: { from: "#1fc39a", to: "#0a6b52" },
  purple: { from: "#9d6bff", to: "#5b21b6" },
  dark: { from: "#8c93a3", to: "#41454f" },
};

export default function ProjectCard({ project }: { project: Project; index?: number }) {
  const accent = ACCENT[project.accent];

  return (
    <article className="border border-[var(--border)] rounded-[var(--r-lg)] bg-[var(--bg-2)] overflow-hidden flex flex-col group">
      {/* Banner */}
      <div
        className={`relative h-[132px] flex items-center justify-center ${project.image ? "" : "card-banner"}`}
        style={project.image ? undefined : { background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 440px"
            className="object-cover"
          />
        )}
        {project.image && <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" />}

        {project.ribbon && (
          <span className="absolute top-3 left-3 z-[1] text-[9.5px] font-bold tracking-wide uppercase bg-white/90 text-[#111] rounded px-2 py-1 shadow-sm">
            {project.ribbon}
          </span>
        )}
        <span className="absolute top-3 right-3 z-[1] inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/25 text-white backdrop-blur-sm">
          <i
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: project.status === "Live" ? "#4ade80" : "#fbbf24" }}
          />
          {project.status}
        </span>
        {!project.image && (
          <span className="relative z-[1] font-serif text-white/95 text-[18px] font-semibold px-6 text-center leading-snug drop-shadow-sm">
            {project.title}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-semibold">{project.title}</h3>
          {(project.link || project.repo) && (
            <a
              href={project.link ?? project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="shrink-0 p-1.5 -mt-1 -mr-1 rounded-[var(--r)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-3)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </a>
          )}
        </div>

        <div className="text-[11.5px] text-[var(--muted)] font-mono -mt-1.5">{project.date}</div>

        <p className="text-[13.5px] text-[var(--muted)] leading-relaxed">{project.longDesc ?? project.desc}</p>

        {project.features && (
          <ul className="flex flex-col gap-1.5">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2 text-[13px] text-[var(--text)]">
                <span className="text-[var(--muted)] mt-[2px]">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}