"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const article = document.querySelector("article");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrolled = window.scrollY - articleTop + windowHeight * 0.3;
      const total = articleHeight;

      const pct = Math.min(Math.max(scrolled / total, 0), 1) * 100;
      setProgress(pct);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (progress <= 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]" aria-hidden="true">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, var(--color-gold), var(--color-cta))",
        }}
      />
    </div>
  );
}
