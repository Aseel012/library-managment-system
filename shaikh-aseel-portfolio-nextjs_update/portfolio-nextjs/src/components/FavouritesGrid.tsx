"use client";

import { useState } from "react";
import { favourites } from "@/lib/data";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "design", label: "Design Inspiration" },
  { key: "dev", label: "Developer Resources" },
] as const;

export default function FavouritesGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const items = filter === "all" ? favourites : favourites.filter((f) => f.category === filter);

  return (
    <div className="p-[var(--pad)] flex flex-col gap-5">
      <div className="inline-flex self-start items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-2)] p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
              filter === f.key ? "bg-[var(--text)] text-[var(--bg)]" : "text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] px-4 py-3 hover:border-[var(--dot-strong)] hover:translate-x-0.5 transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
              alt=""
              width={28}
              height={28}
              className="w-7 h-7 rounded-[6px] shrink-0 bg-[var(--bg-3)] object-contain p-1"
            />
            <div className="min-w-0">
              <h4 className="text-[13.5px] font-semibold truncate">{item.name}</h4>
              <p className="text-[12px] text-[var(--muted)] truncate">{item.desc}</p>
            </div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto shrink-0 text-[var(--muted)]">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
