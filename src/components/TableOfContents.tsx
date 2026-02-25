"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ label }: { label: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const els = article.querySelectorAll("h2, h3");
    const items: TocItem[] = [];
    els.forEach((el) => {
      // Generate id from text if missing
      if (!el.id) {
        el.id = (el.textContent || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      items.push({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });
    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="bg-card rounded-xl border border-border p-5">
      <h4 className="text-xs uppercase text-muted tracking-wider mb-3">{label}</h4>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block text-[13px] leading-snug py-1 transition-colors duration-200 ${
                h.level === 3 ? "pl-3" : ""
              } ${
                activeId === h.id
                  ? "text-cta font-medium"
                  : "text-sub hover:text-text"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
