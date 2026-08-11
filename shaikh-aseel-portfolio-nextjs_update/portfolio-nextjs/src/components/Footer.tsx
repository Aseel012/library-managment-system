import ViewCounter from "./ViewCounter";

export default function Footer() {
  return (
    <div className="row row--last">
      <div className="col">
        <footer className="site-footer">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
            <div>
              <p className="text-[var(--text)] font-medium">
                Designed &amp; developed by <strong>Shaikh Aseel</strong>
              </p>
              <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <ViewCounter />
          </div>
        </footer>
      </div>
    </div>
  );
}
