import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/getAllPosts";
import { PostCard } from "@/components/posts/PostCard";
import { baseMetadata } from "@/lib/seo";

export const metadata = {
  ...baseMetadata,
  title: "そーがの日記",
  openGraph: { ...baseMetadata.openGraph, title: "そーがの日記" },
  twitter: { ...baseMetadata.twitter, title: "そーがの日記" },
};

function formatDateLong(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export default function HomePage() {
  const sorted = getAllPostsMeta().sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
  const featured = sorted[0];
  const rest = sorted.slice(1, 7);

  return (
    <div className="app-route">
      <section className="container hero">
        <div className="hero__intro">
          <span className="eyebrow">Sōga&apos;s logbook · {new Date().getFullYear()}</span>
          <h1>
            ゆるっと書きためる、<em>日々のこと</em>。
          </h1>
          <p>
            研究・読書・コードの断片。机を離れて、波の音と一緒に整理しています。
          </p>
          <div className="hero__meta">
            <div className="hero__avatar">
              <span className="avatar" />
              <span>
                そーが <span style={{ color: "var(--ink-3)" }}>· Chiba</span>
              </span>
            </div>
            <span style={{ color: "var(--ink-3)", fontSize: 13 }}>
              <span className="eyebrow" style={{ marginRight: 8 }}>
                now
              </span>
              ブログのデザインをリニューアル中。
            </span>
          </div>
        </div>

        {featured && (
          <Link
            href={`/posts/${featured.slug}`}
            className="featured"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="featured__body">
              <div>
                <span className="featured__kicker">
                  <span className="dot" /> 最新のエントリ · {formatDateLong(featured.date)}
                </span>
                <h2>{featured.title}</h2>
                {featured.summary && <p>{featured.summary}</p>}
              </div>
              <div>
                <div className="featured__meta">
                  <span>{formatDateLong(featured.date)}</span>
                  {featured.readingTime && (
                    <>
                      <span className="sep" />
                      <span>{featured.readingTime} 分で読めます</span>
                    </>
                  )}
                  {featured.tags && featured.tags.length > 0 && (
                    <>
                      <span className="sep" />
                      <span>
                        {featured.tags.map((t) => `#${t}`).join("  ")}
                      </span>
                    </>
                  )}
                </div>
                <div style={{ marginTop: 18 }}>
                  <span className="btn btn--primary">
                    続きを読む
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </section>

      <section className="container list">
        <div className="list__head">
          <h3>Recent posts</h3>
          <Link className="link" href="/posts">
            すべて見る
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
        <div>
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          {rest.length === 0 && !featured && (
            <p style={{ color: "var(--ink-3)" }}>まだ記事がありません。</p>
          )}
        </div>
      </section>
    </div>
  );
}
