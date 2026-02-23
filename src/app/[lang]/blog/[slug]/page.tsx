import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/content";
import { articleSchema, breadcrumbSchema, personSchema } from "@/lib/schema";
import { Link } from "@/lib/i18n-routing";

import type { Metadata } from "next";
import { locales } from "@/lib/i18n";

export async function generateStaticParams() {
  const slugs = getPostSlugs("en");
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, lang);
  if (!post) return {};

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `https://plasticluv.com/${l}/blog/${slug}`;
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Dr. Yongwoo Lee" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ["Dr. Yongwoo Lee"],
      tags: post.tags,
      images: post.image
        ? [{ url: `https://plasticluv.com${post.image}`, width: 1200, height: 600, alt: post.title }]
        : [{ url: "https://plasticluv.com/images/og-default.svg", width: 1200, height: 630, alt: "Plastic Love" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [`https://plasticluv.com${post.image}`] : ["https://plasticluv.com/images/og-default.svg"],
    },
    alternates: {
      canonical: `https://plasticluv.com/${lang}/blog/${slug}`,
      languages: alternates,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, lang);
  if (!post) notFound();

  const t = await getTranslations({ locale: lang, namespace: "article" });
  const related = getRelatedPosts(slug, post.category, lang);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(post, lang)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: `/${lang}` },
              { name: "Blog", url: `/${lang}` },
              { name: post.title, url: `/${lang}/blog/${slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema()),
        }}
      />

      {/* Article Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <header className="text-center py-12 md:py-16 max-w-3xl mx-auto">
          <span className="inline-block text-xs uppercase text-cta font-semibold bg-cta/10 px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-[40px] text-text leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              <img src="/images/dr-lee-avatar-sm.jpg" alt="Dr. Yongwoo Lee" className="w-8 h-8 rounded-full object-cover object-top" />
              <span className="font-medium text-text">Dr. Yongwoo Lee</span>
            </div>
            <span>&middot;</span>
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{typeof post.readTime === "number" ? `${post.readTime} min read` : post.readTime}</span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="max-w-[920px] mx-auto mb-12">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto rounded-2xl"
              loading="eager"
            />
          ) : (
            <div className="h-72 md:h-96 rounded-2xl bg-gradient-to-br from-accent/20 via-cta/10 to-gold/20 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent/40">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Article Layout: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 max-w-[1200px] mx-auto mb-16">
          {/* Main Content */}
          <article className="prose max-w-none">
            <MDXRemote source={post.content} />

            {/* Disclaimer */}
            <div className="mt-12 p-5 bg-bg-2 rounded-xl border border-border">
              <p className="text-xs text-muted leading-relaxed italic">
                {t("disclaimer")}
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* CTA Card */}
              <div className="bg-text rounded-xl p-6 text-bg">
                <h4 className="font-semibold text-sm mb-2">{t("consultation")}</h4>
                <p className="text-bg/70 text-xs mb-4 leading-relaxed">
                  {t("consultationDesc")}
                </p>
                <a
                  href="https://www.vippskorea.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-cta text-white text-sm font-medium py-2.5 rounded-lg hover:bg-cta-hover transition-colors"
                >
                  {t("bookFree")}
                </a>
              </div>

              {/* Author Card */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h4 className="text-xs uppercase text-muted tracking-wider mb-3">{t("aboutAuthor")}</h4>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/images/dr-lee-avatar-md.jpg"
                    alt="Dr. Yongwoo Lee"
                    className="w-10 h-10 rounded-full object-cover object-top"
                  />
                  <div>
                    <p className="text-sm font-medium text-text">Dr. Yongwoo Lee</p>
                    <p className="text-xs text-muted">Board-Certified Plastic Surgeon</p>
                  </div>
                </div>
                <p className="text-xs text-sub leading-relaxed">
                  Plastic surgeon at VIP Plastic Surgery. University of Michigan — Ann Arbor &amp; Pusan National University, College of Medicine.
                </p>
              </div>

              {/* Related Posts */}
              {related.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-5">
                  <h4 className="text-xs uppercase text-muted tracking-wider mb-3">{t("relatedPosts")}</h4>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="block text-sm text-sub hover:text-cta transition-colors line-clamp-2"
                      >
                        {r.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Related Articles Grid */}
        {related.length > 0 && (
          <section className="max-w-[1100px] mx-auto mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("relatedPosts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <div className="p-6 border border-border rounded-xl hover:border-accent/40 hover:shadow-sm transition-all">
                    <span className="text-xs uppercase text-cta font-semibold">{r.category}</span>
                    <h4 className="font-[family-name:var(--font-display)] text-base text-text mt-2 mb-3 line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-muted">{r.date} &middot; {r.readTime} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
