"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { categoryConfig, type Category } from "@/types/blog";
import type { BlogPostMeta } from "@/types/blog";

function formatReadTime(rt: number | string): string {
  if (typeof rt === "number") return `${rt}`;
  const match = String(rt).match(/\d+/);
  return match ? match[0] : "5";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Category descriptions for the directory-style layout
const categoryDescriptions: Record<string, string> = {
  eyes: "Blepharoplasty, ptosis correction, double eyelid surgery, and other eye procedures.",
  lifting: "Facelifts, thread lifts, and anti-aging surgical techniques.",
  injectables: "Botox, dermal fillers, and non-surgical facial contouring.",
  skin: "Laser treatments, skin rejuvenation, and texture improvement.",
  "before-and-after": "Real results and patient transformation stories.",
  "beauty-insider": "Industry trends, tips, and behind-the-scenes insights.",
};

export default function ArticlesClient({ posts, lang }: { posts: BlogPostMeta[]; lang: string }) {
  const [search, setSearch] = useState("");

  // Group posts by category (excluding "all")
  const grouped = useMemo(() => {
    const groups: Record<string, BlogPostMeta[]> = {};

    for (const post of posts) {
      const cat = post.category.toLowerCase();
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(post);
    }

    // Sort each group by newest first
    for (const key of Object.keys(groups)) {
      groups[key].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return groups;
  }, [posts]);

  // Filter by search
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return grouped;

    const q = search.toLowerCase();
    const result: Record<string, BlogPostMeta[]> = {};

    for (const [cat, catPosts] of Object.entries(grouped)) {
      const matches = catPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
      if (matches.length > 0) result[cat] = matches;
    }

    return result;
  }, [grouped, search]);

  // Category order (same as categoryConfig, minus "all")
  const categoryOrder = Object.keys(categoryConfig).filter((k) => k !== "all") as Category[];
  const totalResults = Object.values(filteredGroups).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-text mb-3">
          Browse by Topic
        </h1>
        <p className="text-sub text-base">
          Surgical techniques, recovery guides, non-surgical options, and aftercare — all in one place.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12">
        <div className="relative max-w-md">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, topic, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-text bg-card border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors placeholder:text-muted/50"
          />
        </div>
        {search && (
          <p className="text-xs text-muted mt-2">
            {totalResults} result{totalResults !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      {/* Category Sections */}
      {totalResults > 0 ? (
        <div className="space-y-14">
          {categoryOrder.map((cat) => {
            const catPosts = filteredGroups[cat];
            if (!catPosts || catPosts.length === 0) return null;

            const config = categoryConfig[cat as keyof typeof categoryConfig];

            return (
              <section key={cat} id={cat}>
                {/* Category Header */}
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl text-text">
                    {config.label}
                  </h2>
                  <span className="text-xs text-muted font-medium bg-bg-2 px-2 py-0.5 rounded-full">
                    {catPosts.length}
                  </span>
                </div>
                {categoryDescriptions[cat] && (
                  <p className="text-sub text-sm mb-5 max-w-xl">{categoryDescriptions[cat]}</p>
                )}

                {/* Article List — compact, title-focused */}
                <div className="border border-border rounded-xl overflow-hidden divide-y divide-border bg-card">
                  {catPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      className="group flex items-center gap-4 px-5 py-4 hover:bg-bg-2/50 transition-colors"
                    >
                      {/* Thumbnail (small) */}
                      {post.image ? (
                        <img
                          src={post.image}
                          alt=""
                          className="w-16 h-12 rounded-lg object-cover shrink-0 hidden sm:block"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-cta/10 shrink-0 hidden sm:block" />
                      )}

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-text group-hover:text-cta transition-colors line-clamp-1 md:line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-sub line-clamp-1 mt-0.5 hidden sm:block">
                          {post.description}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="shrink-0 text-right hidden md:block">
                        <span className="text-xs text-muted">{formatDate(post.date)}</span>
                        <span className="text-xs text-muted block">{formatReadTime(post.readTime)} min read</span>
                      </div>

                      {/* Arrow */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted group-hover:text-cta transition-colors">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sub text-sm mb-2">No articles found.</p>
          <p className="text-muted text-xs">Try a different search term.</p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="mt-4 px-4 py-2 text-sm text-cta border border-cta/30 rounded-full hover:bg-cta/5 transition-colors cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
