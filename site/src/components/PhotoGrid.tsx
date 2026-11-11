import type { GalleryPhoto } from "../data/types";
import { ImageIcon } from "./Icons";

export function PhotoGrid({
  photos,
  onSelect,
  label,
}: {
  photos: GalleryPhoto[];
  onSelect: (index: number) => void;
  label: string;
}) {
  if (photos.length === 0) {
    return (
      <div className="photo-grid-empty">
        <ImageIcon />
        <p>Belum ada foto pada galeri ini.</p>
      </div>
    );
  }

  return (
    <ul className="photo-grid" aria-label={label}>
      {photos.map((photo, index) => (
        <li key={photo.id}>
          <button
            type="button"
            className="photo-tile"
            onClick={() => onSelect(index)}
            aria-label={`Lihat foto: ${photo.title}`}
          >
            <img src={photo.imagePath} alt={photo.alt} loading="lazy" />
            <span className="photo-tile-label">{photo.category}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
