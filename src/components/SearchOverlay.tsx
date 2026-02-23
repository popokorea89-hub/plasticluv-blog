"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-routing";
import type { Locale } from "@/lib/i18n";

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
}

export default function SearchOverlay({
  onClose,
  lang,
}: {
  onClose: () => void;
  lang: Locale;
}) {
  const t = useTranslations("nav");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&lang=${lang}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch {
        // Search failed silently
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, lang]);

  const popularSearches = ["Rhinoplasty", "Eyelid Surgery", "Fillers", "Recovery"];

  return (
    <div
      className="fixed inset-0 z-[200] bg-text/40 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="bg-card w-full max-w-xl mx-4 rounded-2xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="w-full bg-transparent text-text outline-none placeholder:text-muted"
          />
          <kbd className="hidden sm:block text-xs text-muted bg-bg-2 px-2 py-0.5 rounded">ESC</kbd>
        </div>

        {/* Results or Popular Searches */}
        <div className="px-5 py-4 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  onClick={onClose}
                  className="block p-3 rounded-xl hover:bg-bg-2 transition-colors"
                >
                  <span className="text-xs text-cta font-medium uppercase">{r.category}</span>
                  <p className="text-sm font-medium text-text mt-0.5">{r.title}</p>
                  <p className="text-xs text-muted mt-0.5 line-clamp-1">{r.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 text-sm text-sub bg-bg-2 rounded-full hover:bg-border transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
