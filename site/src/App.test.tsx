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
  it("renders the Galeri Seragam homepage", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Koleksi Seragam Sekolah",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pilih Kategori Sekolah" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Daftar Sekolah" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/shop by layer/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/add to bag/i)).not.toBeInTheDocument();
  });

  it("searches from the homepage into the school directory", async () => {
    const user = userEvent.setup();
    renderAt("/");
    await user.type(
      screen.getByPlaceholderText("Cari nama sekolah..."),
      "Sukajadi",
    );
    await user.click(screen.getByRole("button", { name: "Cari" }));
    expect(
      screen.getByRole("heading", { level: 1, name: "Daftar Sekolah" }),
    ).toBeInTheDocument();
    expect(screen.getByText("SDN Sukajadi")).toBeInTheDocument();
    expect(screen.getByText("1 sekolah ditemukan")).toBeInTheDocument();
  });

  it("opens a school detail and switches to the information tab", async () => {
    const user = userEvent.setup();
    renderAt("/sekolah/sdn-001-bandung");
    expect(
      screen.getByRole("heading", { level: 1, name: "SDN 001 Bandung" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Download Semua (6 Foto)")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /Informasi/ }));
    expect(
      screen.getByRole("heading", { name: "Informasi Sekolah" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Terakhir diperbarui")).toBeInTheDocument();
  });

  it("renders the four category overview", () => {
    renderAt("/kategori");
    expect(
      screen.getByRole("heading", { level: 1, name: "Kategori Sekolah" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Sekolah").length).toBeGreaterThan(0);
  });
});

describe("admin routes", () => {
  it("renders the demo dashboard", () => {
    renderAt("/admin");
    expect(
      screen.getByRole("heading", { level: 1, name: "Dashboard" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Total Sekolah")).toBeInTheDocument();
    expect(screen.getAllByText("Mode demo", { exact: false }).length).toBeGreaterThan(0);
  });

  it("validates and creates a demo school", async () => {
    const user = userEvent.setup();
    renderAt("/admin/sekolah/baru");
    expect(
      screen.getByRole("heading", { level: 1, name: "Tambah Sekolah" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Simpan" }));
    expect(
      screen.getByText("Nama sekolah minimal 3 karakter."),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/Nama Sekolah/),
      "SDN Uji Coba",
    );
    await user.click(screen.getByRole("button", { name: "Simpan" }));
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Daftar sekolah demo",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/berhasil ditambahkan/)).toBeInTheDocument();
  });

  it("shows validation on the add-photo form", async () => {
    const user = userEvent.setup();
    renderAt("/admin/foto/baru");
    expect(
      screen.getByRole("heading", { level: 1, name: "Tambah Foto" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Simpan Foto" }));
    expect(screen.getByText("Judul foto minimal 3 karakter.")).toBeInTheDocument();
    expect(screen.getByText("Pilih atau unggah foto.")).toBeInTheDocument();
  });

  it("renders the demo-only user management screen", () => {
    renderAt("/admin/pengguna");
    expect(
      screen.getByRole("heading", { level: 1, name: "Pengguna demo" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Tidak ada akun, kata sandi/i)).toBeInTheDocument();
  });
});
