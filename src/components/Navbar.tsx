"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-routing";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchOverlay from "./SearchOverlay";
import type { Locale } from "@/lib/i18n";
import type { BlogPostMeta } from "@/types/blog";
import { categoryConfig, type Category } from "@/types/blog";
import NextLink from "next/link";

export default function Navbar({ lang, posts }: { lang: Locale; posts: BlogPostMeta[] }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const browseRef = useRef<HTMLDivElement>(null);

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
        setBrowseOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close browse when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (browseRef.current && !browseRef.current.contains(e.target as Node)) {
        setBrowseOpen(false);
      }
    };
    if (browseOpen) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
  }, [browseOpen]);

  // Group posts by category (exclude "all")
  const grouped = Object.keys(categoryConfig)
    .filter((k) => k !== "all")
    .map((key) => ({
      key: key as Category,
      label: categoryConfig[key as Category].label,
      posts: posts.filter((p) => p.category === key),
    }))
    .filter((g) => g.posts.length > 0);

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
            {/* Articles Dropdown */}
            <div className="relative hidden md:block" ref={browseRef}>
              <button
                onClick={() => setBrowseOpen(!browseOpen)}
                className="text-sm font-medium text-sub hover:text-text transition-colors flex items-center gap-1"
              >
                Articles
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-200 ${browseOpen ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Panel */}
              {browseOpen && (
                <div className="absolute right-0 top-full mt-3 w-[600px] max-h-[70vh] overflow-y-auto bg-bg border border-border rounded-xl shadow-lg p-5 animate-fade-up">
                  {grouped.map((group) => (
                    <div key={group.key} className="mb-5 last:mb-0">
                      <h3 className="text-xs uppercase tracking-wider text-accent font-semibold mb-2 px-1">
                        {group.label}
                      </h3>
                      <div className="grid grid-cols-1 gap-1">
                        {group.posts.map((post) => (
                          <NextLink
                            key={post.slug}
                            href={`/${lang}/blog/${post.slug}`}
                            onClick={() => setBrowseOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm text-text hover:bg-bg-2 transition-colors leading-snug"
                          >
                            {post.title}
                          </NextLink>
                        ))}
                      </div>
                    </div>
                  ))}
                  {grouped.length === 0 && (
                    <p className="text-sm text-muted text-center py-4">No posts yet.</p>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hidden md:block text-sm font-medium text-sub hover:text-text transition-colors"
            >
              Dr. Lee
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
