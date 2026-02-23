"use client";

import { useState } from "react";
import { categoryConfig, type Category } from "@/types/blog";
import type { BlogPostMeta } from "@/types/blog";

interface CategoryFilterProps {
  allLabel: string;
  posts: BlogPostMeta[];
  children: (filteredPosts: BlogPostMeta[]) => React.ReactNode;
}

export default function CategoryFilter({ allLabel, posts, children }: CategoryFilterProps) {
  const [selected, setSelected] = useState<Category | "all">("all");

  const filtered = selected === "all"
    ? posts
    : posts.filter((p) => p.category === selected);

  return (
    <>
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
      {children(filtered)}
    </>
  );
}
