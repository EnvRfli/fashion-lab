import { Link } from "react-router-dom";
import { ShirtIcon } from "./Icons";

export function BrandMark({
  tone = "dark",
  onClick,
}: {
  tone?: "dark" | "light";
  onClick?: () => void;
}) {
  return (
    <Link
      to="/"
      className={`brand-mark ${tone === "light" ? "brand-mark-light" : ""}`}
      aria-label="Galeri Seragam — Beranda"
      onClick={onClick}
    >
      <span className="brand-mark-icon" aria-hidden="true">
        <ShirtIcon />
      </span>
      <span className="brand-mark-text">Galeri Seragam</span>
    </Link>
  );
}
