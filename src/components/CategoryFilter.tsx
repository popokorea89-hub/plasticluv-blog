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

function formatReadTime(rt: number | string): string {
  if (typeof rt === "number") return `${rt}`;
  const match = String(rt).match(/\d+/);
  return match ? match[0] : "5";
}

export default function CategoryFilter({ allLabel, posts, lang, labels }: CategoryFilterProps) {
  const [selected, setSelected] = useState<Category | "all">("all");

  const filtered = selected === "all" ? posts : posts.filter((p) => p.category.toLowerCase() === selected);
  const featuredPost = filtered.find((p) => p.featured);
  const otherPosts = filtered.filter((p) => p !== featuredPost);

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

      {/* Featured Post — Large Hero Card */}
      {featuredPost && (
        <section className="mb-12 animate-fade-up">
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
                    {featuredPost.category.replace(/-/g, " ")}
                  </span>
                  <span className="text-xs text-muted">{formatReadTime(featuredPost.readTime)} {labels.minRead}</span>
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

      {/* All Other Articles — Clean Grid */}
      {otherPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-text mb-8">
            {labels.recentPosts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/${lang}/blog/${post.slug}`}>
                <div className="group bg-card rounded-xl border border-border p-6 hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5 transition-all h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] uppercase text-cta font-semibold tracking-wide">
                      {post.category.replace(/-/g, " ")}
                    </span>
                    <span className="text-[11px] text-muted">{formatReadTime(post.readTime)} {labels.minRead}</span>
                  </div>
                  <h3 className="font-semibold text-text text-base leading-snug mb-2 group-hover:text-cta transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sub text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {post.description}
                  </p>
                  <span className="text-cta text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    {labels.readMore} <span>&rarr;</span>
                  </span>
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
