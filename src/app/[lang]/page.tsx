import { getTranslations } from "next-intl/server";
import { getAllPostsMeta } from "@/lib/content";
import { Link } from "@/lib/i18n-routing";
import { websiteSchema, medicalBusinessSchema, personSchema } from "@/lib/schema";
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
        <p className="text-lg md:text-xl text-accent font-medium mb-4 italic tracking-tight">
          {t("subtitle")}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-text leading-tight">
          {t("title")}
        </h1>
      </section>

      {/* Category Filter + All Post Sections */}
      <CategoryFilter
        allLabel={t("allCategories")}
        posts={posts}
        lang={lang}
        labels={{
          readMore: t("readMore"),
          recentPosts: t("recentPosts"),
          popularReads: t("popularReads"),
          trending: t("trending"),
          minRead: t("minRead"),
        }}
      />

      {/* Author Banner */}
      <section className="mb-16 bg-card rounded-2xl shadow-sm p-8 md:p-12">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <img
            src="/images/dr-yongwoo-lee.jpg"
            alt="Dr. Yongwoo Lee"
            className="w-28 h-28 rounded-full object-cover object-top shrink-0 mb-5"
            loading="lazy"
          />
          <h3 className="font-[family-name:var(--font-display)] text-xl text-text mb-3">Dr. Yongwoo Lee</h3>
          <p className="text-sub text-sm mb-5 leading-relaxed">
            Board-certified plastic surgeon at VIP Plastic Surgery, specializing in anti-aging surgery and blepharoplasty. Plastic Love is where his passion for the craft meets honest, patient-first guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-5">
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
              University of Michigan — Ann Arbor
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
