import { Link } from "react-router-dom";
import type { GalleryPhoto, School } from "../data/types";
import { formatPhotoCount, schoolImage } from "../lib/schools";
import { ImageIcon } from "./Icons";
import { LevelBadge } from "./LevelBadge";

export function SchoolCard({
  school,
  photos,
}: {
  school: School;
  photos: GalleryPhoto[];
}) {
  const image = schoolImage(school, photos);
  const count = photos.filter((photo) => photo.schoolId === school.id).length;
  const cover = photos.find((photo) => photo.schoolId === school.id);

  return (
    <article className="school-card">
      <Link to={`/sekolah/${school.slug}`} className="school-card-link">
        <div className="school-card-media">
          {image ? (
            <img
              src={image}
              alt={cover?.alt ?? `Foto referensi ${school.name}`}
              loading="lazy"
            />
          ) : (
            <div className="media-missing">
              <ImageIcon />
              <span>Belum ada foto</span>
            </div>
          )}
        </div>
        <div className="school-card-body">
          <h3 className="school-card-name">{school.name}</h3>
          <div className="school-card-meta">
            {school.level ? <LevelBadge level={school.level} /> : null}
            <span>{formatPhotoCount(count)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
