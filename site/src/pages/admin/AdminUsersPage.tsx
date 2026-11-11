import { useState, type FormEvent } from "react";
import { AdminPageHeader } from "../../components/admin/AdminPageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import {
  CheckIcon,
  InfoIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from "../../components/Icons";
import { useDemoData } from "../../data/useDemoData";
import type { DemoUser } from "../../data/types";
import { formatDate } from "../../lib/schools";
import { usePageTitle } from "../../lib/use-page-title";

const ROLES: DemoUser["role"][] = [
  "Admin Demo",
  "Staf Demo",
  "Operator Demo",
];

type Errors = { name?: string; email?: string; role?: string };

export function AdminUsersPage() {
  usePageTitle("Pengguna Demo");
  const { users, addUser, deleteUser } = useDemoData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<DemoUser["role"]>("Staf Demo");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const target = users.find((user) => user.id === deleteId);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 3) next.name = "Nama minimal 3 karakter.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Masukkan alamat email yang valid.";
    } else if (
      users.some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      )
    ) {
      next.email = "Email ini sudah ada pada daftar demo.";
    }
    if (!ROLES.includes(role)) next.role = "Pilih peran demo.";
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }
    addUser({ name, email, role });
    setNotice(`${name.trim()} ditambahkan sebagai pengguna demo.`);
    setName("");
    setEmail("");
    setRole("Staf Demo");
    setErrors({});
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Pengguna"
        title="Pengguna demo"
        description="Daftar ini hanya contoh antarmuka. Tidak ada akun, kata sandi, atau autentikasi sungguhan."
      />

      <div className="admin-note">
        <InfoIcon />
        <p>
          Pengguna demo tidak dapat masuk ke sistem mana pun. Panel admin tetap
          terbuka tanpa login dan tidak melindungi data nyata. Jangan gunakan
          halaman ini untuk data pribadi.
        </p>
      </div>

      <div className="admin-two-column">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Daftar pengguna</h2>
              <p>{users.length} pengguna demo tersimpan di browser ini.</p>
            </div>
          </div>

          {users.length > 0 ? (
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col" className="col-hide-sm">
                      Email
                    </th>
                    <th scope="col">Peran</th>
                    <th scope="col" className="col-hide-sm">
                      Ditambahkan
                    </th>
                    <th scope="col" className="col-actions">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td className="col-hide-sm">{user.email}</td>
                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>
                      <td className="col-hide-sm">
                        {formatDate(user.createdAt)}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="icon-button icon-button-sm is-danger"
                          onClick={() => setDeleteId(user.id)}
                          aria-label={`Hapus pengguna demo ${user.name}`}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-empty">
              <UsersIcon />
              <p>Belum ada pengguna demo pada daftar ini.</p>
            </div>
          )}
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Tambah pengguna demo</h2>
              <p>Data disimpan lokal dan tidak digunakan untuk login.</p>
            </div>
          </div>

          <form className="admin-form compact-form" onSubmit={submit} noValidate>
            <div className="form-field">
              <label htmlFor="user-name" className="field-label">
                Nama <span aria-hidden="true">*</span>
              </label>
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Contoh: Sari Demo"
                aria-invalid={errors.name ? true : undefined}
                maxLength={60}
              />
              {errors.name ? (
                <p className="field-error" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="user-email" className="field-label">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@demo.local"
                aria-invalid={errors.email ? true : undefined}
                maxLength={100}
              />
              {errors.email ? (
                <p className="field-error" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="user-role" className="field-label">
                Peran demo
              </label>
              <select
                id="user-role"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as DemoUser["role"])
                }
              >
                {ROLES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              <PlusIcon />
              Tambah pengguna
            </button>

            {notice ? (
              <p className="inline-status" role="status">
                <CheckIcon />
                {notice}
              </p>
            ) : null}
          </form>
        </section>
      </div>

      {target ? (
        <ConfirmDialog
          title={`Hapus ${target.name}?`}
          description="Pengguna demo ini akan dihapus dari daftar lokal. Tidak ada akun nyata yang terpengaruh."
          confirmLabel="Hapus pengguna"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            deleteUser(target.id);
            setDeleteId(null);
          }}
        />
      ) : null}
    </>
  );
}
