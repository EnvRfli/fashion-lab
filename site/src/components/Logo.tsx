import { Link } from "react-router-dom";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Fairholt Schoolwear — home"
    >
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          width="40"
          height="40"
          rx="10"
          fill={light ? "var(--color-text-inverse)" : "var(--color-base-oxblood)"}
        />
        <path
          d="M13.5 10.5h14v4.2h-9.2v4.1h7.8v4.1h-7.8v7.6h-4.8V10.5Z"
          fill={light ? "var(--color-base-oxblood)" : "var(--color-text-inverse)"}
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.55rem] tracking-[-0.02em] ${
            light ? "text-[var(--color-text-inverse)]" : "text-ink"
          }`}
        >
          Fairholt
        </span>
        <span
          className={`mt-1 text-[0.66rem] font-medium tracking-[0.16em] ${
            light
              ? "text-[var(--color-base-blush)]"
              : "text-[var(--color-text-secondary)]"
          }`}
        >
          Schoolwear
        </span>
      </span>
    </Link>
  );
}
