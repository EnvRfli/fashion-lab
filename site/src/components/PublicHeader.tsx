import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BrandMark } from "./BrandMark";
import { CloseIcon, MenuIcon, UserIcon } from "./Icons";

const NAV_LINKS = [
  { label: "Beranda", to: "/", end: true },
  { label: "Sekolah", to: "/sekolah", end: false },
  { label: "Kategori", to: "/kategori", end: false },
  { label: "Tentang", to: "/tentang", end: false },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="public-header">
      <div className="shell public-header-inner">
        <BrandMark onClick={() => setOpen(false)} />

        <nav aria-label="Navigasi utama" className="desktop-nav">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "is-active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/admin/masuk" className="btn btn-outline header-login">
            <UserIcon />
            <span>Login Admin</span>
          </Link>
          <button
            type="button"
            className="icon-button mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="public-mobile-menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <dialog
        id="public-mobile-menu"
        ref={dialogRef}
        className="mobile-menu-dialog"
        aria-label="Menu navigasi"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-panel">
          <div className="mobile-menu-top">
            <BrandMark onClick={() => setOpen(false)} />
            <button
              type="button"
              className="icon-button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Navigasi seluler" className="mobile-nav">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? "is-active" : ""}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu-footer">
            <Link
              to="/admin/masuk"
              className="btn btn-outline"
              onClick={() => setOpen(false)}
            >
              <UserIcon />
              Login Admin
            </Link>
            <p>Mode demo — data sekolah dan foto adalah contoh.</p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
