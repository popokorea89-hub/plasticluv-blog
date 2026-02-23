"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/lib/i18n-routing";
import { locales, localeNames, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function switchLang(locale: Locale) {
    router.replace(pathname, { locale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-sub hover:text-text rounded-full hover:bg-bg-2 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {localeNames[currentLang]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-lg border border-border py-2 min-w-[160px] z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLang(locale)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-bg-2 transition-colors ${
                locale === currentLang ? "text-cta font-medium" : "text-sub"
              }`}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
