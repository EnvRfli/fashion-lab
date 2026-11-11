import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PublicFooter } from "./PublicFooter";
import { PublicHeader } from "./PublicHeader";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function PublicLayout() {
  return (
    <div className="public-layout">
      <a className="skip-link" href="#main-content">
        Lewati ke konten utama
      </a>
      <ScrollManager />
      <PublicHeader />
      <main id="main-content" className="public-main">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
