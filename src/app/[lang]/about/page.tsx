import { getTranslations } from "next-intl/server";
import { personSchema, medicalBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { locales } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "about" });

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `https://plasticluv.com/${l}/about`;
  }

  return {
    title: `${t("title")} — Board-Certified Plastic Surgeon in South Korea`,
    description:
      "Dr. Yongwoo Lee is a board-certified plastic surgeon at VIP Plastic Surgery. University of Michigan — Ann Arbor graduate and ISAPS member specializing in anti-aging and eye surgery.",
    alternates: {
      canonical: `https://plasticluv.com/${lang}/about`,
      languages: alternates,
    },
  };
}

const training = [
  { role: "Plastic Surgeon", place: "VIP Plastic Surgery", year: "Present", current: true },
  { role: "Clinical Professor", place: "Pusan National University Hospital, Plastic Surgery", year: "" },
  { role: "Fellowship", place: "Pusan National University Hospital, Plastic Surgery", year: "" },
  { role: "Board Certified", place: "Korean Board of Plastic Surgery", year: "" },
  { role: "Resident", place: "Pusan National University Hospital, Plastic Surgery", year: "" },
  { role: "Internship", place: "Pusan National University Hospital", year: "" },
];

const specialties = [
  {
    title: "Facelift & Anti-Aging",
    desc: "Full, mini, and mid-face lifts for natural, long-lasting facial rejuvenation.",
    icon: "M12 8v4l2 2M12 2a10 10 0 100 20 10 10 0 000-20z",
    primary: true,
  },
  {
    title: "Eye Surgery",
    desc: "Blepharoplasty, ptosis correction, double eyelid, epicanthoplasty, and under-eye rejuvenation.",
    icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    primary: true,
  },
  {
    title: "Liposuction & Body Contouring",
    desc: "Targeted fat removal and sculpting for the face, chin, abdomen, and thighs.",
    icon: "M4 4h16v16H4z M9 9v6 M15 9v6",
    primary: true,
  },
  {
    title: "Botox & Fillers",
    desc: "Wrinkle reduction, facial contouring, and natural volume restoration.",
    icon: "M12 2v20M2 12h20",
    primary: false,
  },
  {
    title: "Thread Lifting",
    desc: "Non-surgical PDO/PLLA thread lifts for facial lifting and tightening.",
    icon: "M12 2l9 4.5v5c0 5.25-3.56 10.15-9 11.5-5.44-1.35-9-6.25-9-11.5v-5L12 2z",
    primary: false,
  },
  {
    title: "Laser Treatments",
    desc: "Skin rejuvenation, pigmentation correction, and texture improvement.",
    icon: "M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-5.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707",
    primary: false,
  },
];

const memberships = [
  "Korean Society of Plastic and Reconstructive Surgeons (KSPRS)",
  "Korean Society for Aesthetic Plastic Surgery (KSAPS)",
  "Korean Cleft Palate Association (KCPA)",
  "International Society of Aesthetic Plastic Surgery (ISAPS)",
];

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "about" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: `/${lang}` },
              { name: "About", url: `/${lang}/about` },
            ])
          ),
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Hero */}
        <section className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-[360px_1fr] gap-10 items-start">
          {/* Photo */}
          <div className="md:sticky md:top-24">
            <img
              src="/images/dr-yongwoo-lee-web.jpg"
              alt="Dr. Yongwoo Lee — Board-Certified Plastic Surgeon"
              className="w-full max-w-[360px] mx-auto rounded-2xl object-cover aspect-[3/4]"
              loading="eager"
            />
          </div>

          {/* Bio */}
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-[40px] text-text mb-2">
              {t("title")}
            </h1>
            <p className="text-cta font-medium mb-1">{t("role")}</p>
            <p className="text-muted text-sm mb-6">{t("clinic")}</p>

            <div className="text-sub text-base leading-relaxed space-y-4 mb-8">
              <p>
                Dr. Yongwoo Lee is a board-certified plastic surgeon currently practicing at VIP Plastic Surgery, South Korea. He brings a unique international perspective to aesthetic medicine, having studied Brain, Behavior and Cognitive Science at the University of Michigan — Ann Arbor before pursuing his medical degree at Pusan National University, College of Medicine.
              </p>
              <p>
                His extensive training at Pusan National University Hospital — from internship through residency, fellowship, and a clinical professorship — has given him deep expertise in both reconstructive and aesthetic plastic surgery. He specializes in anti-aging procedures, including facelifts and upper and lower blepharoplasty, as well as liposuction, body contouring, and non-surgical treatments such as Botox, dermal fillers, thread lifting, and laser therapy.
              </p>
              <p>
                As a member of the International Society of Aesthetic Plastic Surgery (ISAPS) and several Korean professional societies, Dr. Yongwoo Lee stays at the forefront of global aesthetic surgery advances. Through Plastic Love — born from a genuine love for the craft of plastic surgery — he shares evidence-based insights to help patients worldwide make informed decisions about their care.
              </p>
            </div>

          </div>
        </section>

        {/* Education */}
        <section className="py-12 border-t border-border">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("education")}</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bg-2 flex items-center justify-center shrink-0 text-sm font-bold text-accent">
                UM
              </div>
              <div>
                <h4 className="font-semibold text-text">University of Michigan — Ann Arbor</h4>
                <p className="text-sub text-sm">Bachelor of Science, Brain, Behavior and Cognitive Science</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bg-2 flex items-center justify-center shrink-0 text-sm font-bold text-accent">
                PNU
              </div>
              <div>
                <h4 className="font-semibold text-text">Pusan National University, College of Medicine</h4>
                <p className="text-sub text-sm">Master of Medicine (MM)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Training Timeline */}
        <section className="py-12 border-t border-border">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("training")}</h2>
          <div className="relative pl-8 border-l-2 border-border space-y-8">
            {training.map((item, i) => (
              <div key={i} className="relative">
                <div
                  className={`absolute -left-[calc(2rem+5px)] w-3 h-3 rounded-full border-2 ${
                    item.current
                      ? "bg-accent border-accent"
                      : "bg-bg border-border"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <h4 className="font-semibold text-text text-sm">{item.role}</h4>
                  {item.current && (
                    <span className="text-xs text-cta font-medium bg-cta/10 px-2 py-0.5 rounded-full w-fit">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sub text-sm">{item.place}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specialties */}
        <section className="py-12 border-t border-border">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("specialties")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialties.map((s) => (
              <div
                key={s.title}
                className={`bg-card rounded-xl border p-6 hover:shadow-md transition-all ${
                  s.primary ? "border-cta/40 ring-1 ring-cta/20" : "border-border"
                }`}
              >
                {s.primary && (
                  <span className="inline-block text-[10px] uppercase tracking-wider text-cta font-semibold bg-cta/10 px-2 py-0.5 rounded-full mb-3">
                    Primary Specialty
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.primary ? "bg-cta/10" : "bg-bg-2"}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cta">
                    <path d={s.icon} />
                  </svg>
                </div>
                <h4 className="font-semibold text-text text-sm mb-2">{s.title}</h4>
                <p className="text-sub text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Memberships */}
        <section className="py-12 border-t border-border">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{t("memberships")}</h2>
          <div className="space-y-3">
            {memberships.map((m) => (
              <div key={m} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-gold)" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sub text-sm">{m}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 mb-8">
          <div className="bg-text rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-bg mb-2">
                {t("ctaTitle")}
              </h3>
              <p className="text-bg/70 text-sm max-w-lg">{t("ctaDesc")}</p>
            </div>
            <Link
              href={`/${lang}/consultation`}
              className="shrink-0 px-6 py-3 bg-cta text-white text-sm font-medium rounded-full hover:bg-cta-hover transition-colors"
            >
              {t("bookConsultation")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
