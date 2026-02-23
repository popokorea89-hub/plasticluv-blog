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
          href="https://fonts.googleapis.com/css2?family=Gloock&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
