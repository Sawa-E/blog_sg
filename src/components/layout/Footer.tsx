import { SITE, SOCIAL_LINKS } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span className="brand__mark" style={{ width: 18, height: 18 }} />
            <strong style={{ color: "var(--ink)", fontSize: 14 }}>
              {SITE.name}
            </strong>
          </div>
          <div>© {currentYear} Sawa-E. Built with Next.js 16 + MDX.</div>
        </div>
        <div className="site-footer__links">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
          <a href={SITE.repository} target="_blank" rel="noreferrer">
            GitHub repo
          </a>
        </div>
      </div>
    </footer>
  );
}
