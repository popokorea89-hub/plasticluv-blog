"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
  /** Minimum views to display (default 100) */
  minViews?: number;
}

export default function ViewCounter({ slug, minViews = 100 }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Increment view and get count
    fetch(`/api/views/${slug}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => setViews(null));
  }, [slug]);

  // Don't render anything if loading, error, or below threshold
  if (views === null || views < minViews) return null;

  const formatted =
    views >= 1000 ? `${(views / 1000).toFixed(1).replace(/\.0$/, "")}k` : views.toString();

  return (
    <>
      <span className="hidden sm:inline">&middot;</span>
      <span className="flex items-center gap-1">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {formatted} views
      </span>
    </>
  );
}
