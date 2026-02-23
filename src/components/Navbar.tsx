"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-routing";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchOverlay from "./SearchOverlay";
import type { Locale } from "@/lib/i18n";

export default function Navbar({ lang }: { lang: Locale }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
      if (e.key === "Escape") setSearchOpen(false);
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
          <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-text">
            Plastic Love
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-text hover:text-accent transition-colors"
            >
              {t("blog")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-sub hover:text-accent transition-colors"
            >
              {t("about")}
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
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

            {/* Language Switcher */}
            <LanguageSwitcher currentLang={lang} />

            {/* CTA */}
            <a
              href="https://www.vippskorea.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center px-4 py-2 bg-cta text-white text-sm font-medium rounded-full hover:bg-cta-hover hover:-translate-y-0.5 transition-all"
            >
              {t("bookConsultation")}
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} lang={lang} />}
    </>
  );
}
