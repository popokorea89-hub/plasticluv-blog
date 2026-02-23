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

export const categoryConfig = {
  all: { label: "All" },
  eyes: { label: "Eyes" },
  lifting: { label: "Lifting" },
  injectables: { label: "Injectables" },
  skin: { label: "Skin" },
  "before-and-after": { label: "Before & After" },
  "beauty-insider": { label: "Beauty Insider" },
} as const;

export const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

export type Category = keyof typeof categoryConfig;
