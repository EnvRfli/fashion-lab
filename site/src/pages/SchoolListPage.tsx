import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { SchoolCard } from "../components/SchoolCard";
import { SchoolFilters } from "../components/SchoolFilters";
import { SearchBar } from "../components/SearchBar";
import { useDemoData } from "../data/useDemoData";
import {
  filterAndSortSchools,
  parseLevelFilter,
  parseSort,
  type SchoolQuery,
} from "../lib/schools";
import { usePageTitle } from "../lib/use-page-title";

function readQuery(params: URLSearchParams): SchoolQuery {
  return {
    query: params.get("q") ?? "",
    level: parseLevelFilter(params.get("kategori")),
    sort: parseSort(params.get("urut")),
  };
}

export function SchoolListPage() {
  usePageTitle("Portofolio Klien");
  const [params, setParams] = useSearchParams();
  const { schools, photos } = useDemoData();
  const query = readQuery(params);

  const results = useMemo(
    () => filterAndSortSchools(schools, photos, query),
    [schools, photos, query],
  );

  const updateQuery = (next: SchoolQuery) => {
    const nextParams = new URLSearchParams();
    if (next.query.trim()) nextParams.set("q", next.query.trim());
    if (next.level !== "semua") nextParams.set("kategori", next.level);
    if (next.sort !== "terbaru") nextParams.set("urut", next.sort);
    setParams(nextParams, { replace: true });
  };

  const submitSearch = () => updateQuery(query);

  return (
    <>
      <section className="page-hero">
        <div className="shell page-hero-inner">
          <div>
            <p className="eyebrow">Portofolio</p>
            <h1>Portofolio Klien</h1>
            <p>
              Telusuri klien berdasarkan nama atau kategori. Setiap klien
              memiliki galeri foto hasil pekerjaan.
            </p>
          </div>
          <SearchBar
            id="school-list-search"
            value={query.query}
            onChange={(value) => updateQuery({ ...query, query: value })}
            onSubmit={submitSearch}
          />
        </div>
      </section>

      <section className="section section-listing">
        <div className="shell">
          <SchoolFilters
            query={query}
            onChange={updateQuery}
            showSearch={false}
            resultCount={results.length}
          />

          {results.length > 0 ? (
            <>
              <h2 className="sr-only">Hasil pencarian klien</h2>
              <div className="school-grid">
                {results.map((school) => (
                  <SchoolCard key={school.id} school={school} photos={photos} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              title="Klien tidak ditemukan"
              description="Tidak ada klien yang cocok dengan pencarian dan filter ini. Coba kata kunci lain atau tampilkan semua kategori."
              action={
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setParams(new URLSearchParams(), { replace: true });
                  }}
                >
                  Tampilkan semua klien
                </button>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
