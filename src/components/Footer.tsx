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
              href="https://www.instagram.com/dr.popo_ps/"
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
