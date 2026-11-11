import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { STAGES } from "../data/products";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Junior", to: "/shop?stage=junior" },
  { label: "Senior", to: "/shop?stage=senior" },
  { label: "Sixth", to: "/shop?stage=sixth" },
  { label: "Fit and care", to: "/#fit-and-care" },
];

function getActiveStage(location: ReturnType<typeof useLocation>): string | null {
  if (location.pathname !== "/shop") return null;
  return new URLSearchParams(location.search).get("stage");
}

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  const activeStage = getActiveStage(location);
  const bagLabel = `Bag, ${count} ${count === 1 ? "item" : "items"}`;

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

  const closeMenu = () => setOpen(false);

  return (
    <header className="border-b border-line bg-chalk">
      <div className="shell flex h-[var(--layout-header-height)] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="nav-link"
                  aria-current={
                    link.to === "/shop" &&
                    activeStage === null &&
                    location.pathname === "/shop"
                      ? "page"
                      : activeStage !== null &&
                          link.to.endsWith(`stage=${activeStage}`)
                        ? "page"
                        : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="bag-link" aria-label={bagLabel}>
            <BagIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bag-count" aria-hidden="true">
              {count}
            </span>
          </Link>
          <div className="lg:hidden">
            <button
              type="button"
              className="icon-button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className="mobile-menu"
        aria-label="Menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <div className="flex min-h-dvh flex-col bg-chalk">
          <div className="shell flex h-[var(--layout-header-height)] items-center justify-between border-b border-line">
            <Logo />
            <button
              type="button"
              className="icon-button"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex-1 py-8">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.label} className="border-b border-line">
                  <Link
                    to={link.to}
                    className="flex min-h-14 items-center justify-between py-3 font-display text-2xl text-ink"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[var(--radius-md)] bg-blush p-4">
              <p className="text-sm font-medium text-ink">Shop by stage</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {STAGES.map((stage) => (
                  <li key={stage.id}>
                    <Link
                      to={`/shop?stage=${stage.id}`}
                      className="chip"
                      onClick={closeMenu}
                    >
                      {stage.label} {stage.ages}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/cart"
              className="btn btn-primary mt-6 w-full"
              onClick={closeMenu}
            >
              <BagIcon className="h-5 w-5" />
              View bag ({count})
            </Link>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
