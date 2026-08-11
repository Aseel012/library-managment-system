"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
];

const MORE = [
  { href: "/favourites", label: "Favourites", sub: "Tools, sites & more" },
  { href: "/movies", label: "Movies & Actors", sub: "Favourite cinema & actors" },
  { href: "/ides", label: "IDEs & Tools", sub: "Editors, design & dev stack" },
];

const ALL_LINKS = [...NAV, ...MORE];

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  function openCmd() {
    window.dispatchEvent(new CustomEvent("open-cmd-palette"));
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="row row--first !border-t-0">
        <div className="col header-col">
          <div className="flex items-center justify-between h-[62px] px-[var(--pad)]">
            <Link href="/" className="font-serif text-[20px] font-bold tracking-tight">
              Shaikh Aseel
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-[13.5px] font-medium ${
                      active ? "text-[var(--text)] font-semibold" : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-[var(--text)]" />}
                  </Link>
                );
              })}

              <div className="relative" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={moreOpen}
                  className="flex items-center gap-1 text-[13.5px] font-medium text-[var(--muted)] hover:text-[var(--text)]"
                >
                  More
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] shadow-[var(--sh-md)] p-1.5 animate-fade-up">
                    {MORE.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`block rounded-[var(--r)] px-3 py-2 hover:bg-[var(--bg-3)] ${pathname === item.href ? "bg-[var(--bg-3)]" : ""}`}
                      >
                        <div className="text-[13.5px] font-semibold text-[var(--text)]">{item.label}</div>
                        <div className="text-[11.5px] text-[var(--muted)]">{item.sub}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCmd}
                className="hidden sm:flex items-center gap-1.5 rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--bg-2)] px-2.5 py-1.5 text-[12px] font-semibold text-[var(--muted)] hover:border-[var(--dot-strong)] hover:text-[var(--text)]"
                aria-label="Open command palette"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                <kbd>⌘K</kbd>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="relative rounded-[var(--r)] p-2 text-[var(--muted)] hover:bg-[var(--bg-2)] hover:text-[var(--text)] border border-transparent hover:border-[var(--border)] overflow-hidden"
              >
                <span
                  className={`inline-flex transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isDark === null ? "opacity-0" : "opacity-100 rotate-0 scale-100"
                  }`}
                  key={isDark ? "sun" : "moon"}
                >
                  {isDark === null ? <span className="block w-[17px] h-[17px]" /> : isDark ? <SunIcon /> : <MoonIcon />}
                </span>
              </button>

              {/* Mobile hamburger — only visible below md */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                className="md:hidden rounded-[var(--r)] p-2 text-[var(--muted)] hover:bg-[var(--bg-2)] hover:text-[var(--text)] border border-transparent hover:border-[var(--border)]"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="md:hidden row !border-t-0">
          <div className="col">
            <nav className="mobile-nav-enter flex flex-col p-2.5 gap-0.5 bg-[var(--bg-2)]">
              {ALL_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-[var(--r)] px-3.5 py-3 text-[14.5px] font-medium ${
                      active ? "bg-[var(--bg-3)] text-[var(--text)] font-semibold" : "text-[var(--muted)] hover:bg-[var(--bg-3)] hover:text-[var(--text)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}