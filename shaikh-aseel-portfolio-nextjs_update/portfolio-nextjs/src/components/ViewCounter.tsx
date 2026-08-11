"use client";

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = "shaikh-aseel-portfolio";

    async function run() {
      try {
        const hit = await fetch(`https://api.countapi.xyz/hit/${key}/views`);
        if (!hit.ok) throw new Error("counter unavailable");
        const data = await hit.json();
        if (!cancelled) setCount(data.value);
      } catch {
        // Offline / API unreachable — fall back to a local session count
        // so the UI never shows a broken state.
        try {
          const local = Number(localStorage.getItem("local-view-count") || 0) + 1;
          localStorage.setItem("local-view-count", String(local));
          if (!cancelled) setCount(local);
        } catch {
          if (!cancelled) setCount(null);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {count === null ? "— views" : `${count.toLocaleString()} views`}
    </span>
  );
}
