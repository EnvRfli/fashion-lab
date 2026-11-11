import { useId } from "react";
import { EDUCATION_LEVELS } from "../data/education-levels";
import type { SchoolQuery, SchoolSort } from "../lib/schools";
import { FilterIcon, SearchIcon, SortIcon } from "./Icons";

const SORT_OPTIONS: { value: SchoolSort; label: string }[] = [
  { value: "terbaru", label: "Terbaru" },
  { value: "nama", label: "Nama A–Z" },
  { value: "foto", label: "Foto Terbanyak" },
];

export function SchoolFilters({
  query,
  onChange,
  showSearch = true,
  resultCount,
}: {
  query: SchoolQuery;
  onChange: (next: SchoolQuery) => void;
  showSearch?: boolean;
  resultCount?: number;
}) {
  const id = useId();
  const levelId = `${id}-level`;
  const sortId = `${id}-sort`;
  const searchId = `${id}-search`;
  const active = query.query !== "" || query.level !== "semua";

  return (
    <div className="school-filters">
      {showSearch ? (
        <div className="filter-field filter-field-search">
          <label htmlFor={searchId}>Cari sekolah</label>
          <div className="filter-control filter-control-search">
            <SearchIcon aria-hidden="true" />
            <input
              id={searchId}
              type="search"
              value={query.query}
              placeholder="Cari nama sekolah..."
              onChange={(event) =>
                onChange({ ...query, query: event.target.value })
              }
            />
          </div>
        </div>
      ) : null}

      <div className="filter-field">
        <label htmlFor={levelId}>Filter Kategori</label>
        <div className="filter-control">
          <FilterIcon aria-hidden="true" />
          <select
            id={levelId}
            value={query.level}
            onChange={(event) =>
              onChange({
                ...query,
                level: event.target.value as SchoolQuery["level"],
              })
            }
          >
            <option value="semua">Semua kategori</option>
            {EDUCATION_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.id} — {level.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-field">
        <label htmlFor={sortId}>Urutkan</label>
        <div className="filter-control">
          <SortIcon aria-hidden="true" />
          <select
            id={sortId}
            value={query.sort}
            onChange={(event) =>
              onChange({
                ...query,
                sort: event.target.value as SchoolSort,
              })
            }
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {active ? (
        <button
          type="button"
          className="filter-reset"
          onClick={() =>
            onChange({ query: "", level: "semua", sort: query.sort })
          }
        >
          Hapus filter
        </button>
      ) : null}

      {typeof resultCount === "number" ? (
        <p className="filter-count" role="status" aria-live="polite">
          {resultCount} sekolah ditemukan
        </p>
      ) : null}
    </div>
  );
}
