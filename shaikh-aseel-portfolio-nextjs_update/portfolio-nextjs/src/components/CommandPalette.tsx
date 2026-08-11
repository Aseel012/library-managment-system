"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  label: string;
  sub?: string;
  kbd: string;
  shortcutKey: string; // the letter used with Shift for the global shortcut
  action: () => void;
};

type Group = {
  heading: string;
  items: Item[];
};

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }

  function setTheme(mode: "light" | "dark" | "system") {
    const dark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    if (mode === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", mode);
    setOpen(false);
  }

  const groups: Group[] = useMemo(
    () => [
      {
        heading: "Sections",
        items: [
          { label: "Experience", kbd: "shift + E", shortcutKey: "e", action: () => router.push("/experience") },
          { label: "Projects", kbd: "shift + P", shortcutKey: "p", action: () => router.push("/projects") },
          { label: "Favourites", kbd: "shift + B", shortcutKey: "b", action: () => router.push("/favourites") },
          { label: "IDEs & Tools", kbd: "shift + S", shortcutKey: "s", action: () => router.push("/ides") },
        ],
      },
      {
        heading: "General",
        items: [
          {
            label: "Copy Link",
            kbd: "shift + C",
            shortcutKey: "c",
            action: () => {
              navigator.clipboard?.writeText(window.location.href);
              showToast("Link copied to clipboard");
            },
          },
        ],
      },
      {
        heading: "Theme",
        items: [
          { label: "Light Mode", kbd: "shift + T", shortcutKey: "t", action: () => setTheme("light") },
          { label: "Dark Mode", kbd: "shift + D", shortcutKey: "d", action: () => setTheme("dark") },
          { label: "System", kbd: "shift + Y", shortcutKey: "y", action: () => setTheme("system") },
        ],
      },
    ],
    [router]
  );

  const allItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const filteredGroups = useMemo(() => {
    if (!query.trim()) return groups;
    const q = query.toLowerCase();
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  const hasResults = filteredGroups.some((g) => g.items.length > 0);

  useEffect(() => {
    function isTypingTarget(el: EventTarget | null) {
      const node = el as HTMLElement | null;
      if (!node) return false;
      const tag = node.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || node.isContentEditable;
    }

    function onKey(e: KeyboardEvent) {
      // Cmd/Ctrl + K opens the palette from anywhere.
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      // Shift + <letter> global shortcuts — skip while the user is typing
      // in a text field (including the palette's own search input).
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        const key = e.key.toLowerCase();
        const match = allItems.find((i) => i.shortcutKey === key);
        if (match) {
          e.preventDefault();
          match.action();
          setOpen(false);
        }
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmd-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmd-palette", onOpenEvent);
    };
  }, [allItems]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm pt-[14vh] px-4 animate-fade-up"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] shadow-[var(--sh-md)] overflow-hidden flex flex-col max-h-[72vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3 px-4 pt-4 pb-3 border-b border-[var(--border)]">
              <div className="shrink-0 w-8 h-8 rounded-[var(--r)] bg-[var(--bg-3)] flex items-center justify-center text-[var(--text)]">
                <GridIcon />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-[var(--text)]">Navigation Menu</div>
                <div className="text-[12px] text-[var(--muted)]">Quickly jump to sections or actions</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="shrink-0 rounded-[var(--r)] p-1 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-3)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--muted)] shrink-0">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for actions…"
                className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-[var(--muted)]"
              />
            </div>

            <div className="flex-1 overflow-y-auto py-1.5">
              {!hasResults && <div className="px-4 py-6 text-center text-[13px] text-[var(--muted)]">No matches</div>}
              {filteredGroups.map((group) => (
                <div key={group.heading} className="mb-1.5 last:mb-0">
                  <div className="px-4 pt-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">{group.heading}</div>
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.action();
                        setOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[13.5px] hover:bg-[var(--bg-3)] text-left"
                    >
                      <span>{item.label}</span>
                      <span className="text-[10.5px] font-mono text-[var(--muted)] border border-[var(--border)] rounded px-1.5 py-0.5">{item.kbd}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--border)] text-[11px] text-[var(--muted)]">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span className="ml-auto">esc to close</span>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] rounded-full bg-[var(--text)] text-[var(--bg)] text-[12.5px] font-medium px-4 py-2 shadow-[var(--sh-md)] animate-fade-up">
          {toast}
        </div>
      )}
    </>
  );
}
