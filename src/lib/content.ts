import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

const contentDir = path.join(process.cwd(), "src/content/blog");

export function getPostSlugs(lang: string = "en"): string[] {
  const dir = path.join(contentDir, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string, lang: string = "en"): BlogPost | null {
  // Try the requested language first, fall back to English
  let filePath = path.join(contentDir, lang, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDir, "en", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date),
    updated: data.updated instanceof Date ? data.updated.toISOString().split("T")[0] : data.updated ? String(data.updated) : undefined,
    category: data.category,
    tags: data.tags || [],
    readTime: data.readTime || 5,
    image: data.image,
    featured: data.featured || false,
    author: {
      name: "Dr. Yongwoo Lee",
      role: "Board-Certified Plastic Surgeon",
      image: "/images/dr-lee-avatar.jpg",
    },
    content,
  };
}

export function getAllPosts(lang: string = "en"): BlogPost[] {
  const slugs = getPostSlugs(lang).length > 0 ? getPostSlugs(lang) : getPostSlugs("en");
  return slugs
    .map((slug) => getPostBySlug(slug, lang))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostsMeta(lang: string = "en"): BlogPostMeta[] {
  return getAllPosts(lang).map(({ content, author, ...meta }) => meta);
}

export function getFeaturedPost(lang: string = "en"): BlogPost | null {
  const posts = getAllPosts(lang);
  return posts.find((p) => p.featured) || posts[0] || null;
}

export function getPostsByCategory(category: string, lang: string = "en"): BlogPostMeta[] {
  if (category === "All") return getAllPostsMeta(lang);
  return getAllPostsMeta(lang).filter((p) => p.category === category);
}

export function getRelatedPosts(slug: string, category: string, lang: string = "en", limit = 3): BlogPostMeta[] {
  return getAllPostsMeta(lang)
    .filter((p) => p.slug !== slug)
    .filter((p) => p.category === category)
    .slice(0, limit);
}
