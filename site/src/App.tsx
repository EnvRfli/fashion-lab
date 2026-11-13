import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { PublicLayout } from "./components/PublicLayout";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AboutPage } from "./pages/AboutPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SchoolDetailPage } from "./pages/SchoolDetailPage";
import { SchoolListPage } from "./pages/SchoolListPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminSchoolFormPage } from "./pages/admin/AdminSchoolFormPage";
import { AdminSchoolsPage } from "./pages/admin/AdminSchoolsPage";

function SchoolDetailRoute() {
  const { slug } = useParams();
  return <SchoolDetailPage key={slug} />;
}

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sekolah" element={<SchoolListPage />} />
        <Route path="sekolah/:slug" element={<SchoolDetailRoute />} />
        <Route path="kategori" element={<CategoriesPage />} />
        <Route path="tentang" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="admin/masuk" element={<AdminLoginPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="sekolah" element={<AdminSchoolsPage />} />
        <Route path="sekolah/baru" element={<AdminSchoolFormPage />} />
        <Route
          path="sekolah/:id/edit"
          element={<AdminSchoolFormPage />}
        />
        {/* Old feature URLs stay valid but no longer expose separate screens. */}
        <Route
          path="kategori"
          element={<Navigate to="/admin/sekolah" replace />}
        />
        <Route
          path="foto/baru"
          element={<Navigate to="/admin/sekolah" replace />}
        />
        <Route
          path="foto"
          element={<Navigate to="/admin/sekolah" replace />}
        />
        <Route
          path="pengguna"
          element={<Navigate to="/admin/sekolah" replace />}
        />
      </Route>
    </Routes>
  );
}
