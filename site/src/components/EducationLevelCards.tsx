import { Link } from "react-router-dom";
import { EDUCATION_LEVELS } from "../data/education-levels";
import {
  BookIcon,
  CapIcon,
  ChevronDownIcon,
  TeddyIcon,
  TrophyIcon,
} from "./Icons";

const ICONS = {
  teddy: TeddyIcon,
  cap: CapIcon,
  book: BookIcon,
  trophy: TrophyIcon,
} as const;

export function EducationLevelCards({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <div className="level-grid">
      {EDUCATION_LEVELS.map((level) => {
        const Icon = ICONS[level.icon];
        return (
          <Link
            key={level.id}
            to={`/sekolah?kategori=${level.id}`}
            className="level-card"
            data-level={level.id}
          >
            <span className="level-card-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="level-card-copy">
              <span className="level-card-code">{level.label}</span>
              <span className="level-card-count">
                {counts[level.id] ?? 0} Klien
              </span>
            </span>
            <ChevronDownIcon className="level-card-chevron" />
          </Link>
        );
      })}
    </div>
  );
}
