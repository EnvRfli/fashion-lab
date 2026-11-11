# Deploy Galeri Seragam to Vercel

This guide deploys the **Galeri Seragam** frontend in `site/` as a static Vite
SPA. No backend, database, or environment variables are required.

## 1. What Vercel needs

Because the Vercel project root is already set to `site`, use these values:

| Setting | Value |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `site` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js Version | `22.x` (or a newer supported version; Vite 8 needs `>=22.12`) |
| Environment Variables | none |

The repository already includes:

- `site/vercel.json` — rewrites every unknown path to `/index.html` so direct
  links and refreshes work for `/sekolah/:slug`, `/admin/...`, etc.
- `site/package.json` — build script and Node engine requirement.
- `site/public/images/` — the eight verified local photos, copied into `dist`
  by Vite.

## 2. Deploy from the Vercel dashboard

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. In **Configure Project**:
   - Set **Root Directory** to `site`.
   - Confirm **Framework Preset** is `Vite`.
   - Confirm **Build Command** is `npm run build`.
   - Confirm **Output Directory** is `dist`.
   - Leave **Install Command** as `npm install`.
   - Add no environment variables.
4. Open **Project Settings → General → Node.js Version** and choose `22.x` if
   it is not already selected. Vite 8 requires Node `^20.19.0 || >=22.12.0`.
5. Click **Deploy**.
6. After the build, open the production URL and test the routes in section 5.

Every push to the production branch (usually `main`) triggers a new deployment.
Pull requests get preview URLs automatically.

## 3. Deploy with the Vercel CLI

Run the CLI **from `site`**, not the repository root, because the Vercel project
root is `site`:

```powershell
cd site
npx vercel
```

The first run links the folder to a Vercel project. Accept the detected Vite
settings, or set them explicitly:

```text
Framework Preset: Vite
Build Command:    npm run build
Output Directory: dist
Install Command:  npm install
```

Deploy to production:

```powershell
npx vercel --prod
```

Local `.vercel/` metadata is ignored by Git.

## 4. Why `vercel.json` is required

The app uses React Router with client-side routes such as:

- `/sekolah/sdn-001-bandung`
- `/admin/foto/baru`
- `/admin/sekolah/:id/edit`

A static host returns a 404 for those paths unless it serves `index.html` for
unknown routes. `site/vercel.json` provides the SPA fallback:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Do not add a `base` path in `vite.config.ts` unless the site is served from a
subdirectory. On a normal Vercel domain, the base stays `/`.

## 5. Post-deploy checks

Open the production URL and verify:

1. `/` — hero, level cards, school cards, footer.
2. `/sekolah` — search, filter, sort, reset.
3. `/sekolah/sdn-001-bandung` — detail page, Galeri/Informasi tabs, photo
   preview.
4. Directly open the same detail URL in a new tab — it must not 404.
5. `/admin` — dashboard, sidebar, recent-school table.
6. `/admin/sekolah/baru` — form validation and save.
7. `/admin/foto/baru` — demo-library selection and real upload preview.
8. “Download Semua” on a school detail — a ZIP with real JPEGs downloads.
9. Mobile width around 390px — menu, search, filter, and two-column gallery.
10. Refresh `/admin/sekolah` and confirm the route still loads.

## 6. Important deployment behavior

- **Demo data is per browser.** School, photo, category, and user changes are
  stored in `localStorage` on the visitor's device. They are not shared between
  visitors or devices, and they disappear if the browser storage is cleared.
- **Admin is not secure.** `/admin/masuk` is a visual demo; it does not
  authenticate anyone. Do not put real personal or school data behind it.
- **Uploads stay local.** A photo uploaded in the admin is stored in that
  browser only; it is not uploaded to Vercel or a server.
- **No server functions.** The build is static. Vercel Functions, a database,
  and environment variables are intentionally unused.
- **Photos are demonstration imagery.** The Pexels photos are not official
  school uniforms. See `docs/03-asset-manifest.md`.

## 7. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Direct deep link or refresh returns 404 | Confirm `site/vercel.json` exists and the project root is `site`; redeploy |
| Build fails with unsupported Node version | Set Node.js Version to `22.x` and ensure `site/package.json` engines is `>=22.12.0` |
| Vercel does not detect Vite | Manually set Framework Preset `Vite`, build `npm run build`, output `dist` |
| Blank page after deploy | Confirm Root Directory `site` and Output Directory `dist`; check the browser console |
| Images 404 | Confirm `site/public/images/` is committed and the build copied them into `dist/images/` |
| Admin changes disappear | Expected: they are browser-local; use the same browser/profile or reset the demo data |
| ZIP download does nothing | Check the browser console/network for blocked downloads; the ZIP is built from local photo bytes |

## 8. Local production check before deploying

```powershell
cd site
npm run build
npm run preview
# open http://127.0.0.1:3000
```

The build output should be `site/dist/`. `site/dist` is ignored by Git and is
recreated by Vercel on every deployment.
