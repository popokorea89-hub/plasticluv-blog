"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-routing";
import SearchOverlay from "./SearchOverlay";
import type { Locale } from "@/lib/i18n";
import type { BlogPostMeta } from "@/types/blog";

export default function Navbar({ lang, posts }: { lang: Locale; posts: BlogPostMeta[] }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl shadow-sm"
            : "bg-bg/60 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-accent">
            Plastic Love
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Desktop Links */}
            <Link
              href="/"
              className="hidden md:block text-sm font-medium text-sub hover:text-text transition-colors"
            >
              Blog
            </Link>

            <Link
              href="/articles"
              className="hidden md:block text-sm font-medium text-sub hover:text-text transition-colors"
            >
              Articles
            </Link>

            <Link
              href="/about"
              className="hidden md:block text-sm font-medium text-sub hover:text-text transition-colors"
            >
              About
            </Link>

            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-bg-2 flex items-center justify-center hover:bg-border transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* CTA */}
            <Link
              href="/consultation"
              className="hidden sm:flex items-center px-4 py-2 bg-cta text-white text-sm font-medium rounded-full hover:bg-cta-hover hover:-translate-y-0.5 transition-all"
            >
              {t("bookConsultation")}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-bg-2 flex items-center justify-center hover:bg-border transition-colors"
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                ) : (
                  <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu — Full Screen Overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-bg z-40 px-6 pt-8 pb-12 flex flex-col animate-fade-up">
            <div className="space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block text-lg font-medium text-text py-3 border-b border-border/50">Blog</Link>
              <Link href="/articles" onClick={() => setMobileOpen(false)} className="block text-lg font-medium text-text py-3 border-b border-border/50">Articles</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-lg font-medium text-text py-3 border-b border-border/50">About</Link>
            </div>
            <div className="mt-8">
              <Link
                href="/consultation"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-cta text-white text-base font-medium py-3 rounded-full hover:bg-cta-hover transition-colors"
              >
                {t("bookConsultation")}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} lang={lang} />}
    </>
  );
}
