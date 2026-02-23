import { getTranslations } from "next-intl/server";
import { getAllPostsMeta, getFeaturedPost } from "@/lib/content";
import { Link } from "@/lib/i18n-routing";
import { websiteSchema, medicalBusinessSchema, personSchema, breadcrumbSchema } from "@/lib/schema";
import CategoryFilter from "@/components/CategoryFilter";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "home" });
  return {
    title: "Plastic Love — Trusted Plastic Surgery Insights from Seoul",
    description: "Evidence-based plastic surgery information from Dr. Yongwoo Lee, a board-certified surgeon specializing in facelift and blepharoplasty at VIP Plastic Surgery, South Korea.",
    keywords: ["plastic surgery", "facelift", "blepharoplasty", "anti-aging surgery", "Seoul", "Korea", "Dr. Yongwoo Lee", "VIP Plastic Surgery", "double eyelid surgery", "rhinoplasty", "botox", "fillers"],
    openGraph: {
      title: "Plastic Love — Trusted Plastic Surgery Insights from Seoul",
      description: "Plastic Love — where the art of aesthetics meets the science of care. By Dr. Yongwoo Lee.",
      images: [{ url: "https://plasticluv.com/images/og-default.svg", width: 1200, height: 630, alt: "Plastic Love" }],
    },
    alternates: {
      canonical: `https://plasticluv.com/${lang}`,
      languages: {
        en: "https://plasticluv.com/en",
        ko: "https://plasticluv.com/ko",
        ja: "https://plasticluv.com/ja",
        zh: "https://plasticluv.com/zh",
        id: "https://plasticluv.com/id",
        fr: "https://plasticluv.com/fr",
        es: "https://plasticluv.com/es",
        pt: "https://plasticluv.com/pt",
        ar: "https://plasticluv.com/ar",
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "home" });
  const posts = getAllPostsMeta(lang);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />

      {/* Hero */}
      <section className="text-center py-16 md:py-20 animate-fade-up">
        <span className="inline-block text-xs uppercase tracking-[0.15em] text-accent font-semibold mb-4 px-4 py-1.5 bg-bg-2 rounded-full">
          {t("badge")}
        </span>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-text leading-tight mb-4">
          {t("title")}
        </h1>
        <p className="text-sub text-base max-w-lg mx-auto">{t("subtitle")}</p>
      </section>

      {/* Category Filter + All Post Sections */}
      <CategoryFilter allLabel={t("allCategories")} posts={posts}>
        {(filteredPosts) => {
          const featuredInFilter = filteredPosts.find((p) => p.featured);
          const nonFeatured = filteredPosts.filter((p) => !p.featured);
          const recentFiltered = nonFeatured.slice(0, 3);
          const gridFiltered = filteredPosts.slice(featuredInFilter ? 1 : 0).slice(recentFiltered.length, recentFiltered.length + 4);
          const numberedFiltered = filteredPosts.slice(0, 4);

          return (
            <>
              {/* Featured Post */}
              {featuredInFilter && (
                <section className="mb-16 animate-fade-up">
                  <Link href={`/blog/${featuredInFilter.slug}`}>
                    <div className="bg-card rounded-2xl shadow-md overflow-hidden grid md:grid-cols-[1.1fr_1fr] hover:-translate-y-1 hover:shadow-lg transition-all">
                      <div className="h-64 md:h-auto bg-gradient-to-br from-accent/30 via-cta/20 to-gold/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                            <path d="M12 8v4l2 2" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs uppercase text-cta font-semibold bg-cta/10 px-3 py-1 rounded-full">
                            {featuredInFilter.category}
                          </span>
                          <span className="text-xs text-muted">{featuredInFilter.date}</span>
                        </div>
                        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-text mb-3 leading-snug">
                          {featuredInFilter.title}
                        </h2>
                        <p className="text-sub text-sm leading-relaxed mb-4 line-clamp-2">
                          {featuredInFilter.description}
                        </p>
                        <span className="text-cta text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
                          {t("readMore")} <span>&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </section>
              )}

              {/* Recent Posts */}
              {recentFiltered.length > 0 && (
                <section className="mb-16">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("recentPosts")}</h2>
                  <div className="space-y-4">
                    {recentFiltered.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <div className="bg-card rounded-xl shadow-sm p-4 grid grid-cols-[180px_1fr] md:grid-cols-[200px_1fr] gap-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                          <div className="h-28 rounded-lg bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/60">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <path d="M3 9h18" />
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-xs uppercase text-cta font-semibold">{post.category}</span>
                              <span className="text-xs text-muted">{post.date}</span>
                            </div>
                            <h4 className="font-semibold text-text text-sm md:text-base mb-1 line-clamp-1">{post.title}</h4>
                            <p className="text-sub text-xs md:text-sm line-clamp-1">{post.description}</p>
                            <p className="text-xs text-muted mt-2">{post.readTime} {t("minRead")}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Grid */}
              {gridFiltered.length > 0 && (
                <section className="mb-16">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("popularReads")}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {gridFiltered.map((post) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <div className="bg-card rounded-xl shadow-sm p-5 hover:-translate-y-1 hover:shadow-md transition-all h-full">
                          <div className="w-10 h-10 rounded-lg bg-bg-2 flex items-center justify-center mb-4">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-text text-sm mb-2 line-clamp-2">{post.title}</h4>
                          <p className="text-sub text-xs line-clamp-2 mb-3">{post.description}</p>
                          <p className="text-xs text-muted">{post.readTime} {t("minRead")}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Numbered List */}
              {numberedFiltered.length > 0 && (
                <section className="mb-16">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("trending")}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {numberedFiltered.map((post, i) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`}>
                        <div className="flex items-start gap-4 p-5 border border-border rounded-xl hover:border-accent/40 hover:shadow-sm transition-all">
                          <span className="font-[family-name:var(--font-display)] text-3xl text-border shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="font-semibold text-text text-sm mb-1 line-clamp-1">{post.title}</h4>
                            <p className="text-xs text-muted">{post.category} &middot; {post.readTime} {t("minRead")}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* No results */}
              {filteredPosts.length === 0 && (
                <section className="mb-16 text-center py-12">
                  <p className="text-sub text-sm">No posts in this category yet.</p>
                </section>
              )}
            </>
          );
        }}
      </CategoryFilter>

      {/* Author Banner */}
      <section className="mb-16 bg-card rounded-2xl shadow-sm p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/dr-yongwoo-lee.jpg"
          alt="Dr. Yongwoo Lee"
          className="w-28 h-28 rounded-full object-cover object-top shrink-0"
          loading="lazy"
        />
        <div className="text-center md:text-left">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-text mb-2">Dr. Yongwoo Lee</h3>
          <p className="text-sub text-sm mb-4 leading-relaxed max-w-lg">
            Board-certified plastic surgeon at VIP Plastic Surgery, specializing in anti-aging surgery and blepharoplasty. Plastic Love is where his passion for the craft meets honest, patient-first guidance.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-xs text-sub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Board Certified
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ISAPS Member
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              University of Michigan
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Pusan National University Hospital
            </span>
          </div>
          <Link href="/about" className="text-cta text-sm font-medium hover:text-cta-hover transition-colors">
            More About Me &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
}
