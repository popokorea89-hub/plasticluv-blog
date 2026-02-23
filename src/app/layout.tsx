import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plasticluv.com"),
  title: {
    default: "Plastic Love — Trusted Plastic Surgery Insights from Seoul",
    template: "%s | Plastic Love",
  },
  description:
    "Plastic Love — where the art of aesthetics meets the science of care. By Dr. Yongwoo Lee, board-certified plastic surgeon.",
  openGraph: {
    type: "website",
    siteName: "Plastic Love",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "7PIGk3_AE2LK3cCdRpAxsszpoSP68wMPoUXnD71wPkk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700&family=Noto+Sans+JP:wght@300;400;500;600;700&family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@300;400;500;600;700&family=Amiri:wght@400;700&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
