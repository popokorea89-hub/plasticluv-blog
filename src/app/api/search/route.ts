import { NextRequest, NextResponse } from "next/server";
import { getAllPostsMeta } from "@/lib/content";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";
  const lang = request.nextUrl.searchParams.get("lang") || "en";

  if (!q) return NextResponse.json([]);

  const posts = getAllPostsMeta(lang);
  const results = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );

  return NextResponse.json(
    results.slice(0, 10).map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
    }))
  );
}
