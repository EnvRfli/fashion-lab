import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/use-page-title";

export function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <div className="section">
      <div className="shell">
        <div className="max-w-[42rem]">
          <p className="text-sm font-medium text-[var(--color-text-accent)]">
            404
          </p>
          <h1 className="heading-1 mt-3">
            This page has left the register.
          </h1>
          <p className="mt-4 max-w-[48ch] leading-relaxed text-[var(--color-text-secondary)]">
            The address may be wrong, or the piece may have moved. The collection
            is still here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/shop">
              Back to the collection
            </Link>
            <Link className="btn btn-secondary" to="/">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
