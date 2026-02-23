"use client";

import { useState } from "react";
import { categoryConfig, type Category } from "@/types/blog";
import type { BlogPostMeta } from "@/types/blog";
import Link from "next/link";

interface CategoryFilterProps {
  allLabel: string;
  posts: BlogPostMeta[];
  lang: string;
  labels: {
    readMore: string;
    recentPosts: string;
    popularReads: string;
    trending: string;
    minRead: string;
  };
}

export default function CategoryFilter({ allLabel, posts, lang, labels }: CategoryFilterProps) {
  const [selected, setSelected] = useState<Category | "all">("all");

  const filtered = selected === "all" ? posts : posts.filter((p) => p.category === selected);
  const featuredPost = filtered.find((p) => p.featured);
  const nonFeatured = filtered.filter((p) => !p.featured);
  const recent = nonFeatured.slice(0, 3);
  const grid = filtered.slice(featuredPost ? 1 : 0).slice(recent.length, recent.length + 4);
  const numbered = filtered.slice(0, 4);

  return (
    <>
      {/* Category Tabs */}
      <section className="mb-10 flex flex-wrap justify-center gap-2">
        {(Object.entries(categoryConfig) as [Category, { label: string }][]).map(
          ([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 cursor-pointer ${
                selected === key
                  ? "bg-text text-bg border-text shadow-sm"
                  : "bg-transparent text-sub border-border hover:border-accent hover:text-accent"
              }`}
            >
              {key === "all" ? allLabel : label}
            </button>
          )
        )}
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16 animate-fade-up">
          <Link href={`/${lang}/blog/${featuredPost.slug}`}>
            <div className="bg-card rounded-2xl shadow-md overflow-hidden grid md:grid-cols-[1.1fr_1fr] hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="h-64 md:h-auto bg-gradient-to-br from-accent/30 via-cta/20 to-gold/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                    <path d="M12 8v4l2 2" />
                  </svg>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase text-cta font-semibold bg-cta/10 px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-muted">{featuredPost.date}</span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-text mb-3 leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-sub text-sm leading-relaxed mb-4 line-clamp-2">
                  {featuredPost.description}
                </p>
                <span className="text-cta text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  {labels.readMore} <span>&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {recent.length > 0 && (
        <section className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{labels.recentPosts}</h2>
          <div className="space-y-4">
            {recent.map((post) => (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
                <div className="bg-card rounded-xl shadow-sm p-4 grid grid-cols-[180px_1fr] md:grid-cols-[200px_1fr] gap-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  <div className="h-28 rounded-lg bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/60">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs uppercase text-cta font-semibold">{post.category}</span>
                      <span className="text-xs text-muted">{post.date}</span>
                    </div>
                    <h4 className="font-semibold text-text text-sm md:text-base mb-1 line-clamp-1">{post.title}</h4>
                    <p className="text-sub text-xs md:text-sm line-clamp-1">{post.description}</p>
                    <p className="text-xs text-muted mt-2">{post.readTime} {labels.minRead}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Grid */}
      {grid.length > 0 && (
        <section className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{labels.popularReads}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {grid.map((post) => (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
                <div className="bg-card rounded-xl shadow-sm p-5 hover:-translate-y-1 hover:shadow-md transition-all h-full">
                  <div className="w-10 h-10 rounded-lg bg-bg-2 flex items-center justify-center mb-4">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-text text-sm mb-2 line-clamp-2">{post.title}</h4>
                  <p className="text-sub text-xs line-clamp-2 mb-3">{post.description}</p>
                  <p className="text-xs text-muted">{post.readTime} {labels.minRead}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Numbered List */}
      {numbered.length > 0 && (
        <section className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">{labels.trending}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {numbered.map((post, i) => (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
                <div className="flex items-start gap-4 p-5 border border-border rounded-xl hover:border-accent/40 hover:shadow-sm transition-all">
                  <span className="font-[family-name:var(--font-display)] text-3xl text-border shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-semibold text-text text-sm mb-1 line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-muted">{post.category} &middot; {post.readTime} {labels.minRead}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <section className="mb-16 text-center py-12">
          <p className="text-sub text-sm">No posts in this category yet.</p>
        </section>
      )}
    </>
  );
}
