import { getAllPostsMeta } from "@/lib/content";
import { locales } from "@/lib/i18n";
import ArticlesClient from "./ArticlesClient";
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
  const posts = getAllPostsMeta(lang);

  return <ArticlesClient posts={posts} lang={lang} />;
}
