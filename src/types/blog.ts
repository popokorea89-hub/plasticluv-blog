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
  lifting: { label: "Facelift & Anti-Aging" },
  eyes: { label: "Eye Surgery" },
  body: { label: "Body Contouring" },
  injectables: { label: "Botox & Fillers" },
  skin: { label: "Skin & Laser" },
  recovery: { label: "Recovery & Aftercare" },
  "beauty-insider": { label: "Beauty Insider" },
} as const;

export const categories = Object.keys(categoryConfig) as (keyof typeof categoryConfig)[];

export type Category = keyof typeof categoryConfig;
