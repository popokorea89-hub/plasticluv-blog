import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-routing";
import type { Locale } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Locale }) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-[family-name:var(--font-display)] text-xl text-text mb-2">
              Plastic Love
            </p>
            <p className="text-sm text-sub leading-relaxed">{t("description")}</p>
          </div>

          {/* SNS */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-sub hover:text-accent hover:border-accent transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Threads */}
            <a
              href="https://www.threads.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-sub hover:text-accent hover:border-accent transition-colors"
              aria-label="Threads"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C7 2 4 5.5 4 9.5c0 3 1.5 5.5 4 6.5 0 2.5-1 4-4 4h0c3 2 8 2 10 0s2-4.5 2-7c0-1.5-.5-3-2-4s-3-1.5-4.5-1c-1 .3-1.5 1-1.5 2s.5 2 2 2.5c1 .3 2 0 2.5-.5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Plastic Love. {t("rights")}
          </p>
          <p className="text-xs text-muted">
            VIP Plastic Surgery, South Korea
          </p>
        </div>
      </div>
    </footer>
  );
}
