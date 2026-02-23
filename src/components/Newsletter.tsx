"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");

  return (
    <section className="bg-text rounded-2xl p-8 md:p-12 text-center max-w-[1400px] mx-auto">
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-bg mb-3">
        {t("title")}
      </h3>
      <p className="text-bg/70 text-sm mb-6 max-w-md mx-auto">
        {t("description")}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: integrate newsletter service
        }}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 px-4 py-3 bg-white/10 text-bg rounded-xl border border-white/20 placeholder:text-bg/40 outline-none focus:border-cta text-sm"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-cta text-white text-sm font-medium rounded-xl hover:bg-cta-hover transition-colors"
        >
          {t("subscribe")}
        </button>
      </form>
      <p className="text-bg/40 text-xs mt-4">{t("privacy")}</p>
    </section>
  );
}
