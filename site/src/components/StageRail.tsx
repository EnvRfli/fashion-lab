import { Link } from "react-router-dom";
import { STAGES } from "../data/products";

export function StageRail() {
  return (
    <nav aria-label="Shop by school stage" className="border-y border-line">
      <ul className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STAGES.map((stage) => (
          <li key={stage.id}>
            <Link
              to={`/shop?stage=${stage.id}`}
              className="group flex min-h-20 items-center justify-between gap-4 px-1 py-5 sm:px-6"
            >
              <span>
                <span className="font-display text-2xl text-ink transition-colors group-hover:text-[var(--color-text-accent)]">
                  {stage.label}
                </span>
                <span className="ml-2 text-sm text-[var(--color-text-secondary)]">
                  ages {stage.ages}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
