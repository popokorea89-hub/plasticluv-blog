import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n-routing";
import type { Locale } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Locale }) {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-[family-name:var(--font-display)] text-xl text-text mb-2">
              Plastic Love
            </p>
            <p className="text-sm text-sub leading-relaxed">{t("description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold text-text mb-3">{t("quickLinks")}</p>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-sub hover:text-accent transition-colors">Blog</Link>
              <Link href="/about" className="text-sm text-sub hover:text-accent transition-colors">About</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold text-text mb-3">{t("legal")}</p>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted">{t("privacy")}</span>
              <span className="text-sm text-muted">{t("terms")}</span>
              <span className="text-sm text-muted">{t("disclaimer")}</span>
            </div>
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
