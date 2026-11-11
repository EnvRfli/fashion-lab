import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DemoNotice } from "./DemoNotice";
import { Footer } from "./Footer";
import { Header } from "./Header";

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

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollManager />
      <DemoNotice />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
