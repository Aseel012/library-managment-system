"use client";

import { useEffect, useState } from "react";

const WEEKS = 53;
const DAYS = 7;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function levelFor(i: number): number {
  const r = seededRandom(i * 17.31);
  if (r > 0.86) return 4;
  if (r > 0.68) return 3;
  if (r > 0.48) return 2;
  if (r > 0.28) return 1;
  return 0;
}

const LEVEL_BG_LIGHT = ["#eeeef2", "#c7e3d0", "#8fcaa3", "#4fa66f", "#1f7a45"];
const LEVEL_BG_DARK = ["#1a1c23", "#123324", "#1c5f3c", "#279659", "#4ade80"];

export default function GithubActivity() {
  const [stats, setStats] = useState<{ repos: number; followers: number; bio: string; joined: string } | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    fetch("https://api.github.com/users/Aseel012")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setStats({
          repos: d.public_repos ?? 18,
          followers: d.followers ?? 4,
          bio: d.bio ?? "Flutter Developer | AI Engineer | Designer",
          joined: d.created_at ? new Date(d.created_at).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "—",
        });
      })
      .catch(() => setStats(null));

    return () => obs.disconnect();
  }, []);

  const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => levelFor(i));
  const total = cells.reduce((a, b) => a + b * 3, 0) + 142;
  const palette = isDark ? LEVEL_BG_DARK : LEVEL_BG_LIGHT;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <div className="grid grid-flow-col grid-rows-7 gap-[3px] w-max">
          {cells.map((lvl, i) => (
            <div key={i} className="w-[10px] h-[10px] rounded-[2px]" style={{ background: palette[lvl] }} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="text-[12.5px] text-[var(--muted)]">
          ~{total.toLocaleString()} contributions for @Aseel012
        </span>
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--muted)]">
          <span>Less</span>
          {palette.map((c, i) => (
            <i key={i} className="w-[10px] h-[10px] rounded-[2px] inline-block" style={{ background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>
      {stats && (
        <div className="flex items-center gap-6 text-[12.5px] text-[var(--muted)] border-t border-[var(--border)] pt-3">
          <span><strong className="text-[var(--text)]">{stats.repos}</strong> repos</span>
          <span><strong className="text-[var(--text)]">{stats.followers}</strong> followers</span>
          <span>joined <strong className="text-[var(--text)]">{stats.joined}</strong></span>
        </div>
      )}
    </div>
  );
}
