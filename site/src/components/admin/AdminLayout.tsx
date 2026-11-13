import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BrandMark } from "../BrandMark";
import {
  CloseIcon,
  HomeIcon,
  InfoIcon,
  LogOutIcon,
  MenuIcon,
  SchoolIcon,
} from "../Icons";
import { useDemoData } from "../../data/useDemoData";

const ADMIN_LINKS = [
  { label: "Dashboard", to: "/admin", icon: HomeIcon, end: true },
  {
    label: "Portofolio",
    to: "/admin/sekolah",
    icon: SchoolIcon,
    end: false,
  },
];

function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Navigasi admin" className="admin-nav">
      <ul>
        {ADMIN_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "is-active" : ""}`
                }
              >
                <Icon />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const { persistence, isAdminSignedIn, signOutAdmin } = useDemoData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    <div className="admin-layout">
      <a className="skip-link" href="#admin-main">
        Lewati ke konten admin
      </a>

      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <BrandMark tone="light" />
          <span>Admin Panel</span>
        </div>
        <AdminNav />
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-side-link">
            <HomeIcon />
            Lihat situs
          </Link>
          <Link
            to="/admin/masuk"
            className="admin-side-link"
            onClick={signOutAdmin}
          >
            <LogOutIcon />
            Keluar
          </Link>
          <p className="admin-side-note">
            Data portofolio disimpan di browser ini.
          </p>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-mobile-brand">
            <BrandMark />
          </div>
          <div className="admin-topbar-meta">
            <span className="muted-badge">Admin</span>
            <span className="admin-session">
              {isAdminSignedIn ? "Sesi admin aktif" : "Sesi admin belum aktif"}
            </span>
            <button
              type="button"
              className="icon-button admin-menu-button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu admin"
              aria-expanded={open}
              aria-controls="admin-mobile-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </header>

        <div
          className={`admin-demo-bar ${
            persistence === "unavailable" ? "is-warning" : ""
          }`}
          role="status"
        >
          <InfoIcon />
          <p>
            {persistence === "unavailable"
              ? "Penyimpanan browser tidak tersedia. Perubahan hanya bertahan selama halaman terbuka."
              : "Data portofolio disimpan di localStorage browser ini. Belum terhubung ke autentikasi dan penyimpanan server."}
          </p>
        </div>

        <main id="admin-main" className="admin-main">
          <Outlet />
        </main>
      </div>

      <dialog
        id="admin-mobile-menu"
        ref={dialogRef}
        className="mobile-menu-dialog"
        aria-label="Menu admin seluler"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-panel admin-mobile-panel">
          <div className="mobile-menu-top">
            <BrandMark onClick={() => setOpen(false)} />
            <button
              type="button"
              className="icon-button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu admin"
            >
              <CloseIcon />
            </button>
          </div>
          <AdminNav onNavigate={() => setOpen(false)} />
          <div className="mobile-menu-footer">
            <Link
              to="/"
              className="btn btn-secondary"
              onClick={() => setOpen(false)}
            >
              <HomeIcon />
              Lihat situs
            </Link>
            <Link
              to="/admin/masuk"
              className="btn btn-outline"
              onClick={() => {
                signOutAdmin();
                setOpen(false);
              }}
            >
              <LogOutIcon />
              Keluar
            </Link>
          </div>
        </div>
      </dialog>
    </div>
  );
}
