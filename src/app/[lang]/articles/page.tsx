import { getTranslations } from "next-intl/server";
import { getAllPostsMeta } from "@/lib/content";
import { categoryConfig, type Category } from "@/types/blog";
import { locales } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `https://plasticluv.com/${l}/articles`;
  }

  return {
    title: "All Articles — Plastic Love",
    description: "Browse all plastic surgery articles by Dr. Yongwoo Lee, organized by category. Expert insights on eyes, lifting, injectables, skin, and more.",
    alternates: {
      canonical: `https://plasticluv.com/${lang}/articles`,
      languages: alternates,
    },
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "home" });
  const posts = getAllPostsMeta(lang);

  const grouped = Object.keys(categoryConfig)
    .filter((k) => k !== "all")
    .map((key) => ({
      key: key as Category,
      label: categoryConfig[key as Category].label,
      posts: posts.filter((p) => p.category === key),
    }))
    .filter((g) => g.posts.length > 0);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
      <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-text mb-3">
        Articles
      </h1>
      <p className="text-sub text-base mb-10 max-w-2xl">
        Evidence-based insights from a board-certified plastic surgeon. Browse by topic below.
      </p>

      <div className="space-y-10">
        {grouped.map((group) => (
          <section key={group.key}>
            <h2 className="text-xs uppercase tracking-wider text-accent font-semibold mb-4 px-1">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${lang}/blog/${post.slug}`}
                  className="group block bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-accent/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-accent font-medium uppercase tracking-wide">
                      {group.label}
                    </span>
                    <span className="text-[11px] text-muted">{post.readTime} {t("minRead")}</span>
                  </div>
                  <h3 className="font-semibold text-text text-sm leading-snug group-hover:text-cta transition-colors mb-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sub text-xs leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
