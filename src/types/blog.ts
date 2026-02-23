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
  all: { label: "All", emoji: "🔍" },
  insights: { label: "Insights", emoji: "💡" },
  science: { label: "Science", emoji: "🧬" },
  "k-aesthetics": { label: "K-Aesthetics", emoji: "🇰🇷" },
  recovery: { label: "Recovery", emoji: "🩹" },
  safety: { label: "Safety", emoji: "🛡️" },
} as const;

export const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

export type Category = keyof typeof categoryConfig;
