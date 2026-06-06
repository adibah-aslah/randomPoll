import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center select-none">
      <span className="text-sm font-bold tracking-widest text-accent uppercase font-sans">
        Error 404
      </span>

      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground font-heading sm:text-5xl">
        Page not found
      </h1>

      <p className="mt-4 text-base text-muted-foreground font-sans max-w-xs sm:max-w-sm">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or deleted.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-md bg-secondary border border-border/60 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/80 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
