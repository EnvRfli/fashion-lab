import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import {
  BookIcon,
  CapIcon,
  CheckIcon,
  ChevronDownIcon,
  InfoIcon,
  TeddyIcon,
  TrophyIcon,
} from "../../components/Icons";
import { EDUCATION_LEVELS } from "../../data/education-levels";
import { useDemoData } from "../../data/useDemoData";
import { CATEGORY_DESCRIPTIONS } from "../../data/seed";
import { countSchoolsByLevel } from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

const ICONS = {
  teddy: TeddyIcon,
  cap: CapIcon,
  book: BookIcon,
  trophy: TrophyIcon,
} as const;

function CategoryRow({
  levelId,
}: {
  levelId: (typeof EDUCATION_LEVELS)[number]["id"];
}) {
  const {
    schools,
    photos,
    categoryDescriptions,
    updateCategoryDescription,
  } = useDemoData();
  const level = EDUCATION_LEVELS.find((item) => item.id === levelId)!;
  const Icon = ICONS[level.icon];
  const defaultDescription =
    CATEGORY_DESCRIPTIONS[levelId] ?? level.description;
  const [draft, setDraft] = useState(
    categoryDescriptions[levelId] ?? defaultDescription,
  );
  const [saved, setSaved] = useState(false);

  const schoolCount = countSchoolsByLevel(schools)[levelId] ?? 0;
  const schoolIds = new Set(
    schools.filter((school) => school.level === levelId).map((school) => school.id),
  );
  const photoCount = photos.filter((photo) => schoolIds.has(photo.schoolId)).length;
  const dirty = draft.trim() !== (categoryDescriptions[levelId] ?? "").trim();

  const save = () => {
    updateCategoryDescription(levelId, draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <article className="admin-category-row" data-level={levelId}>
      <div className="admin-category-icon" aria-hidden="true">
        <Icon />
      </div>
      <div className="admin-category-body">
        <div className="admin-category-heading">
          <h2>
            {level.id} <span>{level.name}</span>
          </h2>
          <p>
            {schoolCount} sekolah · {photoCount} foto
          </p>
        </div>
        <label className="sr-only" htmlFor={`category-${levelId}`}>
          Deskripsi kategori {level.id}
        </label>
        <textarea
          id={`category-${levelId}`}
          rows={2}
          value={draft}
          maxLength={240}
          onChange={(event) => setDraft(event.target.value)}
        />
        <div className="admin-category-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={save}
            disabled={!dirty}
          >
            <CheckIcon />
            Simpan deskripsi
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setDraft(defaultDescription)}
            disabled={draft === defaultDescription}
          >
            Pulihkan default
          </button>
          {saved ? (
            <span className="inline-saved" role="status">
              Tersimpan
            </span>
          ) : null}
          <Link
            className="text-link category-public-link"
            to={`/sekolah?kategori=${levelId}`}
          >
            Lihat sekolah
            <ChevronDownIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AdminCategoriesPage() {
  usePageTitle("Kategori Admin");

  return (
    <>
      <AdminPageHeader
        eyebrow="Kategori"
        title="Kategori sekolah"
        description="Empat jenjang inti dipertahankan. Anda dapat memperbarui deskripsi yang tampil di halaman kategori publik."
      />

      <div className="admin-note">
        <InfoIcon />
        <p>
          TK, SD, SMP, dan SMA adalah kategori inti dan tidak dapat dihapus.
          Jumlah sekolah dan foto dihitung langsung dari data demo.
        </p>
      </div>

      <div className="admin-category-list">
        {EDUCATION_LEVELS.map((level) => (
          <CategoryRow key={level.id} levelId={level.id} />
        ))}
      </div>
    </>
  );
}
