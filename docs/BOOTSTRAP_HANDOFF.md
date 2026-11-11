# Bootstrap Handoff

> **REALIGNMENT NOTE — 2026-11-11.** Bootstrap tooling is preserved and verified
> at **35/35**. The active product is now **Galeri Seragam**, implemented in
> `site/`. The old e-commerce application is superseded and preserved at Git
> checkpoint `ef09a4f`. See `docs/PHASE_STATUS.md`, `docs/REALIGNMENT_AUDIT.md`,
> `docs/MIGRATION_PLAN.md`, and `docs/05-page-specifications.md` before doing
> project work. Do not use the old `/shop`, `/cart`, or fashion direction.
>
> Purpose: let a fresh OpenCode session continue without this conversation.
> Status: bootstrap setup complete; realignment complete on 2026-11-11.

## 1. Environment summary

| Item | Value |
| --- | --- |
| Repository | `D:\personal_project\fashion-lab` |
| Git | Initialized on branch `main` |
| OS | Windows (win32 x64), PowerShell |
| Node.js | `v24.19.0` |
| npm | `11.17.0` |
| OpenCode | `2.2.7` (V2) |
| Active provider/model | Inherited from the session; no model or provider was added or changed |
| Model image input | `opencode-go/deepseek-v4.1-flash` declares `input: ["text","image"]` |
| Browser | Chrome for Testing `157.0.8103.50` at `C:\Users\CAS-NB-0024\.agent-browser\browsers\chrome-157.0.8103.50\chrome.exe` |
| System Chrome | `C:\Program Files\Google\Chrome\Application\chrome.exe` (fallback) |
| Workflow tooling | Root `package.json`; future site belongs in `site/` |

No authentication, provider, or model configuration was modified.

## 2. Installed skill inventory

All three are project-local under `.agents/skills/` and recorded in
`skills-lock.json` (version 2, `installMode: copy`).

| Skill | ID | Source | Installed path | Activation | License / notes |
| --- | --- | --- | --- | --- | --- |
| Frontend Design | `frontend-design` | `anthropics/skills` | `.agents/skills/frontend-design/SKILL.md` | Loaded through the OpenCode `skill` tool; may be mentioned as `@frontend-design` | `LICENSE.txt` is Apache License 2.0 |
| Web Design Guidelines | `web-design-guidelines` | `vercel-labs/agent-skills` | `.agents/skills/web-design-guidelines/SKILL.md` | Loaded through the OpenCode `skill` tool; used for UI review | No standalone license file was copied; GitHub reports no detected license. Verify repository terms before redistribution. |
| Agent Browser | `agent-browser` | `vercel-labs/agent-browser` | `.agents/skills/agent-browser/SKILL.md` | Loaded through the OpenCode `skill` tool; stub instructs `agent-browser skills get core` | Source/project license Apache-2.0; no standalone license file copied into the skill folder |

### Discovery evidence

- The OpenCode session advertised all three skills in its available-skill
  catalog after installation.
- Each skill was loaded through the `skill` tool and returned its body with the
  project-local base directory:
  - `D:\personal_project\fashion-lab\.agents\skills\frontend-design`
  - `D:\personal_project\fashion-lab\.agents\skills\web-design-guidelines`
  - `D:\personal_project\fashion-lab\.agents\skills\agent-browser`
- `npx --no-install skills list` reports all three with source repositories.
- `skills-lock.json` records all three content hashes.
- The `agent-browser` skill is a **discovery stub**; it is not the full usage
  guide. Before browser work, run:

  ```powershell
  npx --no-install agent-browser skills get core
  ```

### Compatibility notes

- OpenCode's project discovery path is `.agents/skills`, so the universal
  install is correct.
- `agent-browser`'s skill frontmatter includes `hidden: true` and
  `allowed-tools`. These are not OpenCode-native fields; OpenCode still
  discovers and loads the skill. Treat them as advisory.
- `web-design-guidelines` fetches the current rules from
  `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
  at review time. Network access is required; the installed skill does not
  bundle the rules.
- The skills CLI reported a medium-risk advisory for `agent-browser` because it
  is a browser automation tool. Review it before use; it runs with the agent's
  permissions.
- `npm install` emitted an `allow-scripts` warning for
  `agent-browser@0.42.0`. Its postinstall script did not run, but the package
  ships the native binary and `agent-browser --version` works. If a future
  version requires the postinstall download, run `npm approve-scripts
  agent-browser` and `npm rebuild agent-browser` after reviewing the script.

## 3. Verified browser capabilities

`agent-browser doctor` result: **7 pass, 1 warning, 0 fail**. The warning is
that `ffmpeg` is not on PATH; only video recording needs it. It does not affect
navigation, snapshots, screenshots, console inspection, or accessibility.

Verified end to end:

| Capability | Evidence |
| --- | --- |
| Browser launches | `agent-browser doctor` launch test; smoke session opened |
| Local page opens | `http://127.0.0.1:4173/agent-browser-smoke.html` |
| Public page opens | `https://example.com` |
| DOM/accessibility snapshot | Returned heading and interactive refs; `@e...` refs worked |
| Form interaction | Filled the test field; clicked the button; read `SMOKE-ACTION-PASSED` |
| Screenshot | `artifacts/visual-qa/bootstrap-smoke/agent-browser-smoke.png`, `public-page-example.png` |
| Console error inspection | `console` returned `[error] SMOKE-CONSOLE-ERROR` |
| Uncaught page error inspection | `errors` returned `Error: SMOKE-PAGE-ERROR` with line/column |
| Accessibility audit | `a11y` returned 0 violations on the smoke fixture |
| Three viewports | QA runner captured 390×844, 768×1024, 1440×900 |
| Visual inspection as image | The smoke screenshot and all three QA screenshots were opened with the `read` tool and described: burgundy header, visible smoke text, stacked mobile cards, two-column tablet/desktop layout |

**Visual review capability is verified for the current model and toolchain.**
The model declares image input and the screenshot was actually consumed as image
content. This does not guarantee a future model will support images; if the
`read` tool cannot present images in a later session, the QA gate must be marked
`BLOCKED` and reviewed by a human or a user-approved vision-capable model.

Browser automation package: `agent-browser@0.42.0`, project-scoped.
Chrome for Testing install location:
`C:\Users\CAS-NB-0024\.agent-browser\browsers\chrome-157.0.8103.50`.

## 4. Created project files

```text
AGENTS.md
README.md
.gitignore
package.json
package-lock.json
skills-lock.json

.agents/skills/
  frontend-design/SKILL.md
  frontend-design/LICENSE.txt
  web-design-guidelines/SKILL.md
  agent-browser/SKILL.md

.opencode/commands/
  build-site.md

docs/
  WORKFLOW.md
  QUALITY_GATES.md
  PHASE_STATUS.md
  BOOTSTRAP_HANDOFF.md
  DECISIONS.md
  01-product-brief.md
  02-visual-references.md
  03-asset-manifest.md
  04-design-system.md
  05-page-specifications.md
  06-visual-qa.md

scripts/
  verify-bootstrap.mjs
  validate-assets.mjs
  visual-qa.mjs
  build-tokens.mjs
  serve-fixture.mjs
  fixtures/agent-browser-smoke.html
  fixtures/qa-page.html

artifacts/
  visual-qa/
    .gitkeep
    bootstrap-smoke/
      agent-browser-smoke.png
      public-page-example.png
      mobile-390.png
      tablet-768.png
      desktop-1440.png
      qa-report.json
```

`artifacts/bootstrap/` contains temporary smoke evidence and is ignored by Git.
The committed copies are under `artifacts/visual-qa/bootstrap-smoke/`.
`artifacts/visual-qa/` is tracked for project QA evidence.

No website was built. `site/` is intentionally absent.

### Tooling details

- `scripts/validate-assets.mjs` — framework-agnostic asset policy validator with
  a 10-case self-test. It rejects missing files, product SVGs, SVG data URLs,
  placeholder/remote product URLs, empty/corrupt images, invalid manifests,
  missing licenses, hash mismatches, and dimension mismatches. Normal SVG icons
  and logos remain allowed.
- `scripts/visual-qa.mjs` — captures and measures 390/768/1440 screenshots,
  console errors, page errors, overflow, broken images, missing alt text,
  unlabeled controls, unnamed interactive elements, and axe results. It always
  records `visualInspection: "PENDING"`; it cannot grant a visual pass.
- `scripts/build-tokens.mjs` — reads the canonical token block from `docs/04`
  and writes CSS custom properties. Use `--require` at G4.
- `scripts/verify-bootstrap.mjs` — checks files, skill lock, command, scripts,
  browser doctor, and local script self-tests.
- `scripts/serve-fixture.mjs` — local fixture server on port 4173.

## 5. Workflow execution instructions

### Start a build

In a fresh OpenCode session:

```text
/build-site <paste the brief, or the path to the brief file>
```

The command:

1. Reads `AGENTS.md`.
2. Loads the three skills.
3. Reads the workflow, quality gates, and phase status.
4. Records the brief in `docs/01-product-brief.md`.
5. Executes Phases 0–8 in order.
6. Runs the gates and updates `docs/PHASE_STATUS.md`.
7. Stops only for a real blocker or an approval checkpoint.
8. Produces an evidence-based completion report.

If no brief is supplied, the command must stop and ask for one.

**Fresh-session verification:** on 2026-11-11, a new session with no prior
conversation expanded `/build-site`, switched to the `build` agent, ran
`verify:bootstrap` (35/35), and stopped at Phase 0 because the brief was empty.
It did not invent a project, and it recorded blocker B1 in
`docs/PHASE_STATUS.md` (commit `16b6921`). The test used the active
`opencode-go/deepseek-v4.1-flash` model; the project command itself pins no
model.

### Mode

- Default: **autonomous**. The agent records justified design decisions and
  continues.
- If the brief says `Mode: approval`, the agent stops at Phase 2, 4, 5, and the
  final sign-off. Non-response is not approval.

### Commands

```powershell
npm run verify:bootstrap
npm run validate:assets
npm run validate:assets -- --require-assets
node scripts/validate-assets.mjs --self-test
npm run qa:visual -- --url http://127.0.0.1:3000
npm run tokens:build -- --require
npm run serve:fixture
```

The self-test command is intentionally run directly so its exit code is obvious.

### Resume

Read `docs/PHASE_STATUS.md`; start at the first phase not `PASSED`. Inspect
`git status` and the last checkpoint commit. Do not redo completed work or
overwrite uncommitted user changes.

### Checkpoints

Commit after each passing phase, for example:

```text
phase-2: visual references — gate passed
```

Do not tag unless requested. Do not commit `node_modules`, build output,
temporary browser state, or unlicensed assets.

## 6. Known limitations

1. **The realignment is complete.** The active project is Galeri Seragam; the
   old e-commerce implementation is preserved at `ef09a4f`, not active.
2. **Demo data is illustrative.** The 12 schools and 62 photo records are a
   demonstration dataset; photo counts are accurate to those records, not real
   inventory. See `docs/06-visual-qa.md` for asset limitations.
3. **The primary reference is stored.** It is
   `docs/references/primary/galeri-seragam-main.png`, a multi-screen composite
   supplied by the project owner, not a page to clone.
4. **`web-design-guidelines` requires network access** each time it is used.
5. **`agent-browser` is a stub skill.** Load `agent-browser skills get core`
   before the first browser command in every session.
6. **No ffmpeg.** Browser video recording is unavailable; screenshots,
   snapshots, console, errors, and accessibility audits work.
7. **npm allow-scripts warning.** See the note in section 2; the current binary
   works.
8. **OpenCode API location limitation.** The shared server's `/api/skill` and
   `/api/command` responses reflect its own location (the home directory), not
   necessarily this project. Project skills were verified through the session
   catalog and `skill` tool; `/build-site` was verified in a fresh project
   session. Do not use `/api/command` as the sole proof of project command
   discovery.
9. **Model balance can block a run.** A non-interactive `opencode run` without
   an explicit model selected the build agent's default `opencode/gemini-4-carbon`
   and received a provider 402 (insufficient balance). The same command with the
   active `opencode-go/deepseek-v4.1-flash` succeeded. The repository does not
   pin a model. If a fresh session inherits an unfunded model, select the funded
   model in OpenCode or top up the account; this is external to the repository.
10. **Stock photography is demonstration imagery.** The eight Pexels photos were
    verified and hashed for the demo. If the client supplies real school photos,
    add them to the manifest and update credits; do not present stock photos as
    official uniforms.
11. **No deployment.** Deployment is out of scope unless a later brief explicitly
    adds it and records the target and credentials handling.

## 7. Exact instructions for the next session

1. Work in `D:\personal_project\fashion-lab`.
2. Read `AGENTS.md`.
3. Read `docs/PHASE_STATUS.md` and this handoff.
4. Run:

   ```powershell
   npm run verify:bootstrap
   ```

   If it fails, fix the setup before any project work.
5. Load the three skills through the `skill` tool if they are not already
   loaded.
6. Read `docs/PHASE_STATUS.md` for the resume point. The realignment is complete;
   do not re-run `/build-site` against the old brief.
7. Start the implemented app with `cd site && npm run dev`, or
   `npm run build && npm run preview`. Public routes: `/`, `/sekolah`,
   `/sekolah/:slug`, `/kategori`, `/tentang`; admin: `/admin`.
8. Re-run quality commands from `docs/05-page-specifications.md` §9 before
   changing released work.
9. Do not change provider or model settings. Do not deploy.
10. Preserve the eight verified demo photos and their credits. Do not introduce
    SVG/CSS/Canvas garments or unlicensed replacements.

## 8. Final verification record

Run `npm run verify:bootstrap` and record the result here. The final status is
also written to `docs/PHASE_STATUS.md`.

| Check | Result |
| --- | --- |
| `npm run verify:bootstrap` | **PASSED — 35/35 checks** on 2026-11-11 (re-run after realignment) |
| Asset validator self-test | **PASSED — 10/10 cases** |
| Browser doctor | **7 pass, 1 warning (ffmpeg), 0 fail** |
| Visual inspection | **PASSED** for final Galeri Seragam screenshots at 390/768/1440 on 2026-11-11 |
| `/build-site` fresh session | **PASSED** — expanded, ran verification, stopped for missing brief, committed `16b6921` |
| Git checkpoints | `fe28235` bootstrap; `16b6921` empty-brief blocker record; `6444607` evidence and handoff; `ef09a4f` pre-realignment storefront; `ec0e678` Galeri Seragam implementation |
| Working tree clean | Verified after the final realignment commit |
