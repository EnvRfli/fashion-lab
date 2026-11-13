import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "../../components/BrandMark";
import {
  ArrowLeftIcon,
  InfoIcon,
  UserIcon,
} from "../../components/Icons";
import { useDemoData } from "../../data/useDemoData";
import { usePageTitle } from "../../lib/use-page-title";

export function AdminLoginPage() {
  usePageTitle("Login Admin");
  const navigate = useNavigate();
  const { signInAdmin, isAdminSignedIn } = useDemoData();
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
      setError("Masukkan kata sandi.");
      return;
    }
    signInAdmin();
    navigate("/admin");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <BrandMark />
        <p className="eyebrow">Panel admin</p>
        <h1>Login Admin</h1>
        <p className="login-intro">
          Masuk untuk mengelola portofolio klien dan foto hasil pekerjaan.
        </p>

        <div className="login-warning" role="note">
          <InfoIcon />
          <p>
            Build ini menyimpan data di browser dan belum terhubung ke server
            autentikasi. Gunakan akses ini hanya pada perangkat tepercaya.
          </p>
        </div>

        {isAdminSignedIn ? (
          <div className="login-session">
            <p role="status">
              <UserIcon />
              Sesi admin sudah aktif di browser ini.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/admin")}
            >
              Lanjut ke dashboard
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
                placeholder="nama@domain.com"
                autoComplete="username"
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
                placeholder="Kata sandi"
                autoComplete="current-password"
                aria-describedby="login-password-hint"
              />
              <p className="field-hint" id="login-password-hint">
                Verifikasi kredensial server belum dikonfigurasi pada build ini.
              </p>
            </div>

            {error ? (
              <p className="field-error" id="login-error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn btn-primary login-submit">
              <UserIcon />
              Masuk
            </button>
          </form>
        )}

        <div className="login-alt">
          <Link to="/" className="back-link">
            <ArrowLeftIcon />
            Kembali ke situs
          </Link>
        </div>
      </div>
    </main>
  );
}
