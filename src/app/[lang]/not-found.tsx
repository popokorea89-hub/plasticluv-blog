import { Link } from "@/lib/i18n-routing";

export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-6 py-24 text-center">
      <p className="text-6xl font-[family-name:var(--font-display)] text-accent mb-4">404</p>
      <h1 className="text-2xl font-semibold text-text mb-3">Page Not Found</h1>
      <p className="text-sub mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-2.5 bg-cta text-white text-sm font-medium rounded-full hover:bg-cta-hover transition-colors"
        >
          Back to Blog
        </Link>
        <Link
          href="/about"
          className="px-6 py-2.5 bg-bg-2 text-text text-sm font-medium rounded-full hover:bg-border transition-colors"
        >
          About Dr. Lee
        </Link>
      </div>
    </div>
  );
}
