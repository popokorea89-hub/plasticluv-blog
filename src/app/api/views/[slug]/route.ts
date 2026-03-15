import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

// Owner IPs to exclude from counting
const OWNER_IPS = (process.env.OWNER_IPS ?? "").split(",").filter(Boolean);

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// GET — return current view count for a slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!redis) return NextResponse.json({ views: 0 });

  const { slug } = await params;
  const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
  return NextResponse.json({ views });
}

// POST — increment view count (deduplicated per IP per slug, owner excluded)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!redis) return NextResponse.json({ views: 0 });

  const { slug } = await params;
  const ip = getClientIp(req);

  // Skip if owner
  if (OWNER_IPS.includes(ip)) {
    const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
    return NextResponse.json({ views });
  }

  // Deduplicate: one count per IP per slug per 24h
  const dedupeKey = `viewed:${slug}:${ip}`;
  const alreadyViewed = await redis.get(dedupeKey);

  if (!alreadyViewed) {
    await redis.set(dedupeKey, 1, { ex: 86400 }); // expires in 24h
    await redis.incr(`views:${slug}`);
  }

  const views = (await redis.get<number>(`views:${slug}`)) ?? 0;
  return NextResponse.json({ views });
}
