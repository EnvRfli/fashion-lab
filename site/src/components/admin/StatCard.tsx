import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  icon,
  tone = "burgundy",
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  tone?: "burgundy" | "pink" | "blue" | "amber";
}) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <span className="stat-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </article>
  );
}
