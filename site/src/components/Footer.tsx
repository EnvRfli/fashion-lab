import { Link } from "react-router-dom";
import { CATEGORIES, STAGES } from "../data/products";
import { Logo } from "./Logo";

const PHOTOGRAPHERS = [
  "Luk Sauvage",
  "Ivan S",
  "Jonathan Borba",
  "Zayona Fashion",
  "Dom J",
  "Eugenia Remark",
  "Rafael Oliveira",
  "Rujwal Pradhan",
];

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--color-base-oxblood-deep)] text-[var(--color-text-inverse)]">
      <div className="shell grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr] lg:gap-12 lg:py-16">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-[var(--color-base-blush)]">
            A fictional schoolwear outfitter, built as a demonstration. Products,
            prices, and checkout are illustrative.
          </p>
          <p className="mt-4 text-xs leading-relaxed footer-muted">
            No orders are placed. No payment is taken. No school affiliation is
            implied.
          </p>
        </div>

        <nav aria-label="Shop">
          <h2 className="text-sm font-medium text-chalk">Shop</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link className="footer-link" to="/shop">
                All pieces
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  className="footer-link"
                  to={`/shop?category=${category.id}`}
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Stages">
          <h2 className="text-sm font-medium text-chalk">Stages</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {STAGES.map((stage) => (
              <li key={stage.id}>
                <Link
                  className="footer-link"
                  to={`/shop?stage=${stage.id}`}
                >
                  {stage.label} {stage.ages}
                </Link>
              </li>
            ))}
            <li>
              <Link className="footer-link" to="/cart">
                Your bag
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-chalk">About this demo</h2>
          <p className="mt-4 text-xs leading-relaxed text-[var(--color-base-blush)]">
            Photography is licensed stock, used as demonstration imagery, not
            the outfitter&rsquo;s inventory. Photographers:{" "}
            {PHOTOGRAPHERS.join(", ")}.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--color-base-blush)]">
            <a
              className="footer-link underline"
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noreferrer"
            >
              Pexels licence
            </a>{" "}
            ·{" "}
            <a
              className="footer-link underline"
              href="https://www.pexels.com/"
              target="_blank"
              rel="noreferrer"
            >
              Pexels
            </a>
          </p>
          <p className="mt-4 text-xs leading-relaxed footer-muted">
            Product names, descriptions, sizes, and prices are sample content.
          </p>
        </div>
      </div>

      <div className="border-t footer-divider">
        <div className="shell flex flex-col gap-2 py-5 text-xs footer-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Fairholt Schoolwear. A fictional demonstration brand.</p>
          <p>Built with React, TypeScript, Vite, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
