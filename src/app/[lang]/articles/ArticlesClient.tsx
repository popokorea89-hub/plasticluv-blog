"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { categoryConfig, type Category } from "@/types/blog";
import type { BlogPostMeta } from "@/types/blog";

type SortOption = "newest" | "oldest" | "readTime";

function formatReadTime(rt: number | string): string {
  if (typeof rt === "number") return `${rt}`;
  const match = String(rt).match(/\d+/);
  return match ? match[0] : "5";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ArticlesClient({ posts, lang }: { posts: BlogPostMeta[]; lang: string }) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = posts;

    // Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category.toLowerCase() === category);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === "readTime") return Number(a.readTime) - Number(b.readTime);
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // newest
    });

    return result;
  }, [posts, category, sort, search]);

  const totalCount = posts.length;
  const filteredCount = filtered.length;

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-text mb-3">
          Articles
        </h1>
        <p className="text-sub text-base max-w-2xl">
          Evidence-based insights from a board-certified plastic surgeon. Browse by topic, search by keyword, or sort to find exactly what you need.
        </p>
      </div>

      {/* Toolbar: Category + Search + Sort */}
      <div className="space-y-4 mb-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.entries(categoryConfig) as [Category, { label: string }][]).map(
            ([key, { label }]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 cursor-pointer ${
                  category === key
                    ? "bg-text text-bg border-text shadow-sm"
                    : "bg-transparent text-sub border-border hover:border-accent hover:text-accent"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Search + Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-text bg-card border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors placeholder:text-muted/50"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted whitespace-nowrap">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-3 py-2.5 text-sm text-text bg-card border border-border rounded-xl focus:outline-none focus:border-cta transition-colors appearance-none pr-8 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="readTime">Quick Reads</option>
            </select>
          </div>

          {/* Count */}
          <span className="text-xs text-muted whitespace-nowrap">
            {filteredCount === totalCount
              ? `${totalCount} article${totalCount !== 1 ? "s" : ""}`
              : `${filteredCount} of ${totalCount}`}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
              <article className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all h-full flex flex-col">
                {/* Image */}
                {post.image ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="h-44 bg-gradient-to-br from-accent/20 via-cta/10 to-gold/20 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent/40">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[11px] uppercase text-cta font-semibold tracking-wide">
                      {post.category.replace(/-/g, " ")}
                    </span>
                    <span className="text-[11px] text-muted">&middot;</span>
                    <span className="text-[11px] text-muted">{formatReadTime(post.readTime)} min</span>
                  </div>

                  <h3 className="font-semibold text-text text-base leading-snug mb-2 group-hover:text-cta transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sub text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {post.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/60">
                    <span className="text-xs text-muted">{formatDate(post.date)}</span>
                    <span className="text-cta text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <span>&rarr;</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sub text-sm mb-2">No articles found.</p>
          <p className="text-muted text-xs">Try adjusting your filters or search terms.</p>
          {(search || category !== "all") && (
            <button
              onClick={() => { setSearch(""); setCategory("all"); }}
              className="mt-4 px-4 py-2 text-sm text-cta border border-cta/30 rounded-full hover:bg-cta/5 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
