import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL("https://shaikhaseel.dev"),
  title: {
    default: "Shaikh Aseel — Portfolio",
    template: "%s — Shaikh Aseel",
  },
  description:
    "Portfolio of Shaikh Aseel — Product-Focused Software Developer building full-stack applications, AI tools, and developer experiences.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
  ],
};

// Inline, blocking theme init — runs before paint so there is never a
// flash of the wrong theme, and it's identical on every route because
// it lives in the root layout instead of being copy-pasted per page.
const THEME_INIT = `
(function () {
  try {
    var s = localStorage.getItem('theme');
    var d = s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (d) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="themed-surface">
        <Header />
        {children}
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
