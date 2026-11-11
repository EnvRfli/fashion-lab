import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "../../components/BrandMark";
import {
  ArrowLeftIcon,
  InfoIcon,
  LogOutIcon,
  UserIcon,
} from "../../components/Icons";
import { useDemoData } from "../../data/useDemoData";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminLoginPage() {
  usePageTitle("Login Admin Demo");
  const navigate = useNavigate();
  const { signInDemo, isDemoSignedIn } = useDemoData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Masukkan alamat email yang valid.");
      return;
    }
    if (password.trim().length < 1) {
      setError("Isi kata sandi apa pun untuk melanjutkan demo.");
      return;
    }
    signInDemo();
    navigate("/admin");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <BrandMark />
        <p className="eyebrow">Panel admin</p>
        <h1>Login Admin</h1>
        <p className="login-intro">
          Halaman ini adalah alur visual untuk demo. Tidak ada autentikasi
          sungguhan, akun, atau perlindungan data.
        </p>

        <div className="login-warning" role="note">
          <InfoIcon />
          <p>
            Kata sandi tidak diperiksa dan tidak disimpan. Siapa pun dapat
            membuka dashboard demo.
          </p>
        </div>

        {isDemoSignedIn ? (
          <div className="login-session">
            <p role="status">
              <UserIcon />
              Sesi demo sudah aktif di browser ini.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/admin")}
            >
              Lanjut ke dashboard demo
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={submit} noValidate>
            <div className="form-field">
              <label htmlFor="login-email" className="field-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nama@demo.local"
                autoComplete="off"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "login-error" : undefined}
              />
            </div>

            <div className="form-field">
              <label htmlFor="login-password" className="field-label">
                Kata sandi
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Kata sandi apa pun"
                autoComplete="off"
                aria-describedby="login-password-hint"
              />
              <p className="field-hint" id="login-password-hint">
                Tidak diperiksa. Gunakan nilai apa pun untuk melihat demo.
              </p>
            </div>

            {error ? (
              <p className="field-error" id="login-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn btn-primary login-submit">
              <LogOutIcon />
              Masuk sebagai demo
            </button>
          </form>
        )}

        <div className="login-alt">
          <Link to="/admin" className="text-link">
            Buka dashboard demo tanpa mengisi form
          </Link>
          <Link to="/" className="back-link">
            <ArrowLeftIcon />
            Kembali ke situs
          </Link>
        </div>
      </div>
    </main>
  );
}
