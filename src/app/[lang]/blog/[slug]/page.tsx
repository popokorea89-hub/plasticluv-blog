import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/content";
import { articleSchema, breadcrumbSchema, personSchema, faqSchema } from "@/lib/schema";
import { Link } from "@/lib/i18n-routing";

import type { Metadata } from "next";
import { locales } from "@/lib/i18n";
import { categoryConfig } from "@/types/blog";

import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";

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

  const seoTitle = post.metaTitle || post.title;

  return {
    title: seoTitle,
    description: post.description,
    authors: [{ name: "Dr. Yongwoo Lee" }],
    openGraph: {
      title: seoTitle,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ["Dr. Yongwoo Lee"],
      tags: post.tags,
      images: post.image
        ? [{ url: `https://plasticluv.com${post.image}`, width: 1200, height: 654, alt: post.title }]
        : [{ url: "https://plasticluv.com/images/og-default.svg", width: 1200, height: 630, alt: "Plastic Love" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
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

  const categoryLabel =
    categoryConfig[post.category.toLowerCase() as keyof typeof categoryConfig]?.label || post.category;
  const postUrl = `https://plasticluv.com/${lang}/blog/${slug}`;

  // Extract FAQ pairs from MDX content (bold questions followed by paragraphs)
  const faqPairs: { question: string; answer: string }[] = [];
  const faqSection = post.content.split(/^## Frequently Asked Questions/m)[1];
  if (faqSection) {
    const faqMatches = faqSection.matchAll(/\*\*(.+?)\*\*\s*\n\n([^*]+?)(?=\n\n\*\*|\n\n##|\s*$)/g);
    for (const match of faqMatches) {
      faqPairs.push({ question: match[1].trim(), answer: match[2].trim() });
    }
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

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
              { name: categoryLabel, url: `/${lang}` },
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
      {faqPairs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(faqPairs)),
          }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-6 mb-2">
          <ol className="flex items-center gap-1.5 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-text transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-border">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </li>
            <li>
              <Link href="/" className="hover:text-text transition-colors">{categoryLabel}</Link>
            </li>
            <li aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-border">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </li>
            <li className="text-sub truncate max-w-[200px] md:max-w-[400px]">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="text-center py-10 md:py-14 max-w-3xl mx-auto">
          <span className="inline-block text-xs uppercase text-cta font-semibold bg-cta/10 px-3 py-1 rounded-full mb-4">
            {categoryLabel}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-[40px] text-text leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
            <div className="flex items-center gap-2">
              <img src="/images/dr-lee-avatar-sm.jpg" alt="Dr. Yongwoo Lee" className="w-8 h-8 rounded-full object-cover object-top" />
              <span className="font-medium text-text">Dr. Yongwoo Lee</span>
            </div>
            <span className="hidden sm:inline">&middot;</span>
            <span>{post.date}</span>
            {post.updated && post.updated !== post.date && (
              <>
                <span>&middot;</span>
                <span className="text-accent">{t("updated")} {post.updated}</span>
              </>
            )}
            <span>&middot;</span>
            <span>{typeof post.readTime === "number" ? `${post.readTime} min read` : post.readTime}</span>
          </div>

          {/* Share Buttons — under meta */}
          <div className="mt-5 flex justify-center">
            <ShareButtons
              title={post.title}
              url={postUrl}
              label={t("share")}
              copiedLabel={t("copied")}
            />
          </div>
        </header>

        {/* Cover Image */}
        <div className="max-w-[1100px] mx-auto mb-12">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 max-w-[1400px] mx-auto mb-16">
          {/* Main Content */}
          <article className="prose max-w-none">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={{
                img: (props: React.ComponentPropsWithoutRef<"img">) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img {...props} loading="lazy" decoding="async" className="w-full h-auto rounded-xl" alt={props.alt || ""} />
                ),
              }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted mr-1">{t("tags")}:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-sub bg-bg-2 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share (bottom of article, mobile-friendly) */}
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <ShareButtons
                title={post.title}
                url={postUrl}
                label={t("share")}
                copiedLabel={t("copied")}
              />
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-5 bg-bg-2 rounded-xl border border-border">
              <p className="text-xs text-muted leading-relaxed italic">
                {t("disclaimer")}
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <TableOfContents label={t("tableOfContents")} />

              {/* CTA Card */}
              <div className="bg-text rounded-xl p-6 text-bg">
                <h4 className="font-semibold text-sm mb-2">{t("consultation")}</h4>
                <p className="text-bg/70 text-xs mb-4 leading-relaxed">
                  {t("consultationDesc")}
                </p>
                <Link
                  href="/consultation"
                  className="block w-full text-center bg-cta text-white text-sm font-medium py-2.5 rounded-lg hover:bg-cta-hover transition-colors"
                >
                  {t("bookFree")}
                </Link>
              </div>

              {/* Author Card */}
              <Link href="/about" className="block group">
                <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-md transition-all">
                  <img
                    src="/images/dr-yongwoo-lee-web.jpg"
                    alt="Dr. Yongwoo Lee — Board-Certified Plastic Surgeon"
                    className="w-full aspect-[3/4] object-cover object-top"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <h4 className="text-xs uppercase text-muted tracking-wider mb-3">{t("aboutAuthor")}</h4>
                    <p className="text-sm font-semibold text-text mb-0.5 group-hover:text-cta transition-colors">Dr. Yongwoo Lee</p>
                    <p className="text-xs text-cta font-medium mb-2">Board-Certified Plastic Surgeon</p>
                    <p className="text-xs text-sub leading-relaxed">
                      University of Michigan — Ann Arbor &amp; Pusan National University College of Medicine. ISAPS member specializing in anti-aging and aesthetic surgery at VIP Plastic Surgery.
                    </p>
                  </div>
                </div>
              </Link>

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
          <section className="max-w-[1400px] mx-auto mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("relatedPosts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <div className="bg-card p-6 border border-border rounded-xl hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <span className="text-xs uppercase text-cta font-semibold">
                      {categoryConfig[r.category.toLowerCase() as keyof typeof categoryConfig]?.label || r.category}
                    </span>
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
