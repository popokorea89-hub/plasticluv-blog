export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  readTime: number;
  image?: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    image?: string;
  };
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  readTime: number;
  image?: string;
  featured?: boolean;
}

export const categories = [
  "All",
  "Anti-Aging",
  "Eye Surgery",
  "Fillers & Botox",
  "Rhinoplasty",
  "Recovery",
  "Choosing a Surgeon",
] as const;

export type Category = (typeof categories)[number];
