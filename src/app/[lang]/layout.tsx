import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { locales, isRtl, type Locale } from "@/lib/i18n";
import { getAllPostsMeta } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(locales, lang)) notFound();

  const locale = lang as Locale;
  const messages = await getMessages();
  const posts = getAllPostsMeta(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar lang={locale} posts={posts} />
      <main className="min-h-screen">{children}</main>
      <Footer lang={locale} />
    </NextIntlClientProvider>
  );
}
