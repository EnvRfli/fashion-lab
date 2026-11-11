import type { EducationLevelId } from "../data/education-levels";

export function LevelBadge({
  level,
  className = "",
}: {
  level: EducationLevelId;
  className?: string;
}) {
  return (
    <span className={`level-badge ${className}`} data-level={level}>
      {level}
    </span>
  );
}
