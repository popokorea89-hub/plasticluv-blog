import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plasticluv.com"),
  title: {
    default: "Plastic Love — Plastic Surgery Answers Before You Decide",
    template: "%s | Plastic Love",
  },
  description:
    "Not just plastic. It's love. Evidence-based plastic surgery insights by Dr. Yongwoo Lee — the answers you deserve before you decide.",
  openGraph: {
    type: "website",
    siteName: "Plastic Love",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
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
