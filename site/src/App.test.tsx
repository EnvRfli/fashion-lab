import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { DemoDataProvider } from "./data/DemoDataProvider";

function renderAt(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <DemoDataProvider>
        <App />
      </DemoDataProvider>
    </MemoryRouter>,
  );
}

describe("public routes", () => {
  it("renders the portfolio homepage without prototype labels", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Portofolio Seragam Klien",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pilih Kategori Klien" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Klien & Hasil Produksi" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/demo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/unduh|download/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/shop by layer/i)).not.toBeInTheDocument();
  });

  it("searches from the homepage into the client listing", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await user.type(
      screen.getByPlaceholderText("Cari nama klien..."),
      "Sukajadi",
    );
    await user.click(screen.getByRole("button", { name: "Cari" }));
    expect(
      screen.getByRole("heading", { level: 1, name: "Portofolio Klien" }),
    ).toBeInTheDocument();
    expect(screen.getByText("SDN Sukajadi")).toBeInTheDocument();
    expect(screen.getByText("1 klien ditemukan")).toBeInTheDocument();
  });

  it("opens a client gallery and switches to the information tab", async () => {
    const user = userEvent.setup();
    renderAt("/sekolah/sdn-001-bandung");
    expect(
      screen.getByRole("heading", { level: 1, name: "SDN 001 Bandung" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /download|unduh/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/demo/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /Informasi/ }));
    expect(
      screen.getByRole("heading", { name: "Informasi Klien" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Terakhir diperbarui")).toBeInTheDocument();
  });

  it("keeps the four category overview for clients", () => {
    renderAt("/kategori");
    expect(
      screen.getByRole("heading", { level: 1, name: "Kategori Klien" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Klien/).length).toBeGreaterThan(0);
  });

  it("keeps the legacy public route and shows a not-found state", () => {
    renderAt("/sekolah/tidak-ada");
    expect(
      screen.getByRole("heading", { name: "Portofolio tidak ditemukan" }),
    ).toBeInTheDocument();
  });
});

describe("admin routes", () => {
  it("renders the simplified dashboard without demo or user management", () => {
    renderAt("/admin");
    expect(
      screen.getByRole("heading", { level: 1, name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Total Klien")).toBeInTheDocument();
    expect(screen.queryByText(/demo/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reset data/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Pengguna")).not.toBeInTheDocument();
  });

  it("requires only a client name and at least one photo on create", async () => {
    const user = userEvent.setup();
    renderAt("/admin/sekolah/baru");
    expect(
      screen.getByRole("heading", { level: 1, name: "Tambah Portofolio" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Simpan & Publikasikan" }),
    );
    expect(screen.getByText("Nama klien wajib diisi.")).toBeInTheDocument();
    expect(
      screen.getByText("Tambahkan minimal satu foto hasil pekerjaan."),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/Nama klien/),
      "Pesantren Al-Falah",
    );
    await user.click(
      screen.getByRole("button", { name: "Simpan & Publikasikan" }),
    );
    expect(
      screen.getByText("Tambahkan minimal satu foto hasil pekerjaan."),
    ).toBeInTheDocument();
  });

  it("edits an existing client without dropping its photos", async () => {
    const user = userEvent.setup();
    const { container } = renderAt(
      "/admin/sekolah/school-sdn-001-bandung/edit",
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Edit Portofolio" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nama klien/)).toHaveValue("SDN 001 Bandung");
    expect(container.querySelectorAll(".portfolio-photo-item")).toHaveLength(6);

    await user.click(
      screen.getByRole("button", { name: "Simpan Perubahan" }),
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Portofolio Klien" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/berhasil diperbarui/)).toBeInTheDocument();
  });

  it("asks for explicit confirmation before deleting a portfolio", async () => {
    const user = userEvent.setup();
    renderAt("/admin/sekolah");
    await user.click(
      screen.getByRole("button", { name: "Hapus SDN 001 Bandung" }),
    );
    expect(
      screen.getByRole("heading", { name: "Hapus SDN 001 Bandung?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/seluruh foto terkait akan dihapus/i),
    ).toBeInTheDocument();
  });

  it("redirects removed feature URLs instead of exposing user management", () => {
    renderAt("/admin/pengguna");
    expect(
      screen.getByRole("heading", { level: 1, name: "Portofolio Klien" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/pengguna demo/i)).not.toBeInTheDocument();
  });
});
