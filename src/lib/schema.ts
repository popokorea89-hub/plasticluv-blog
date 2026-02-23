import type { BlogPost } from "@/types/blog";

const SITE_URL = "https://plasticluv.com";

export function articleSchema(post: BlogPost, lang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: post.title,
    description: post.description,
    image: post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.svg`,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: personSchema(),
    publisher: {
      "@type": "Organization",
      name: "Plastic Love",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/og-default.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/${post.slug}`,
    },
    inLanguage: lang,
    about: {
      "@type": "MedicalSpecialty",
      name: "Plastic Surgery",
    },
    specialty: "Plastic Surgery",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Yongwoo Lee",
    jobTitle: "Board-Certified Plastic Surgeon",
    image: `${SITE_URL}/images/dr-lee-avatar.svg`,
    url: `${SITE_URL}/en/about`,
    sameAs: [],
    worksFor: medicalBusinessSchema(),
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Michigan",
        address: { "@type": "PostalAddress", addressRegion: "MI", addressCountry: "US" },
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Pusan National University College of Medicine",
        address: { "@type": "PostalAddress", addressLocality: "Busan", addressCountry: "KR" },
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Board Certification",
        recognizedBy: { "@type": "Organization", name: "Korean Board of Plastic Surgery" },
      },
    ],
    memberOf: [
      { "@type": "Organization", name: "Korean Society of Plastic and Reconstructive Surgeons (KSPRS)" },
      { "@type": "Organization", name: "Korean Society for Aesthetic Plastic Surgery (KSAPS)" },
      { "@type": "Organization", name: "Korean Cleft Palate Association (KCPA)" },
      { "@type": "Organization", name: "International Society of Aesthetic Plastic Surgery (ISAPS)" },
    ],
    knowsAbout: [
      "Facelift Surgery",
      "Upper Blepharoplasty",
      "Lower Blepharoplasty",
      "Anti-Aging Surgery",
      "Eye Surgery",
      "Botox",
      "Dermal Fillers",
      "Thread Lifting",
      "Laser Treatments",
    ],
  };
}

export function medicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "VIP Plastic Surgery",
    url: "https://www.vippskorea.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    medicalSpecialty: "PlasticSurgery",
    employee: {
      "@type": "Person",
      name: "Dr. Yongwoo Lee",
      jobTitle: "Board-Certified Plastic Surgeon",
    },
    priceRange: "$$$",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Plastic Love",
    url: SITE_URL,
    description: "Plastic Love — where the art of aesthetics meets the science of care. By Dr. Yongwoo Lee, board-certified plastic surgeon.",
    publisher: {
      "@type": "Organization",
      name: "Plastic Love",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/en?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
