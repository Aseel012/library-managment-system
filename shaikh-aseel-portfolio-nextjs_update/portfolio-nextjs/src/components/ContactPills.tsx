"use client";

import { socials } from "@/lib/data";
import { useState } from "react";

function Icon({ name }: { name: string }) {
  switch (name) {
    case "github":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.7.5.8 5.4.8 11.7c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.2 5.4 18.3.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-7.2 8.3L23.3 22h-6.6l-5.2-6.8L5.5 22H2.4l7.7-8.9L1.7 2h6.8l4.7 6.2L18.9 2zm-1.1 18h1.8L7.3 3.9H5.4l12.4 16.1z" />
        </svg>
      );
    case "medium":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      );
    case "mail":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    default:
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
  }
}

const ARROW = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted)] group-hover:text-[var(--text)]">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

export default function ContactPills() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard?.writeText(socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const pills = [
    { key: "github", label: "GitHub", href: socials.github, sub: "@Aseel012", body: "Flutter Developer, AI Engineer & Designer — building apps, crafting UI, and shipping AI-powered tools." },
    { key: "linkedin", label: "LinkedIn", href: socials.linkedin, sub: "Software Developer · IT", body: "Product-focused software developer, 3rd-year B.Tech IT — open to engineering roles and collaborations." },
    { key: "twitter", label: "Twitter", href: socials.twitter, sub: "@ShaikhMdAseel25", body: "Building in public — dev updates, design experiments, and AI tool discoveries." },
    { key: "medium", label: "Medium", href: socials.medium, sub: "Writer", body: "Technical blogs on design systems, frontend architecture, and AI engineering." },
    { key: "resume", label: "Resume", href: socials.resume, sub: "PDF · Google Drive", body: "B.Tech IT · React · Node.js · Flutter · AI Engineering." },
  ];

  return (
    <div className="flex flex-wrap gap-2.5 p-[var(--pad)]">
      {pills.map((p) => (
        <div key={p.key} className="relative group">
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="pill">
            <Icon name={p.key} />
            <span>{p.label}</span>
            {ARROW}
          </a>
          <div className="pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all absolute left-0 top-[calc(100%+8px)] w-64 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] shadow-[var(--sh-md)] p-3.5 z-20">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-3)] flex items-center justify-center text-[13px] font-semibold">
                <Icon name={p.key} />
              </div>
              <div>
                <div className="text-[13px] font-semibold">{p.label}</div>
                <div className="text-[11px] text-[var(--muted)]">{p.sub}</div>
              </div>
            </div>
            <p className="text-[12px] text-[var(--muted)] leading-snug">{p.body}</p>
          </div>
        </div>
      ))}

      <button onClick={copyEmail} className="pill relative">
        <Icon name="mail" />
        <span>{copied ? "Copied!" : "Mail"}</span>
      </button>
    </div>
  );
}
