# 히어로즈 스냅 운영툴 · LiveOps Console

A game operations CMS for a hero-collection mobile RPG, implemented from a Claude Design
prototype (`히어로즈 스냅 운영툴.dc.html`). Built as a **React + Vite + TypeScript** app with
a **dark command-center chrome + light data canvas** design system and hero-collection brand
accents (rarity / element colors).

## Run

```bash
npm install
npm run dev       # http://localhost:5180
npm run build     # type-check (tsc -b) + production bundle
npm run preview   # serve the production build
```

## What's implemented

**All 17 CMS screens are built deeply and interactively** on a full app shell + design system —
no placeholders remain.

**Deep (fully built & interactive):**

- **대시보드 (Dashboard)** — per-platform server-open control, in-game notice composer +
  popup, four seeded KPI cards (move with the topbar date), 14-day revenue & 24-h CCU charts,
  editable monetization metrics vs. industry benchmarks (with ₩ conversion + CSV export),
  and the live-alerts / server-status / recent-issues row.
- **유저 관리 (Users)** — query + status + platform filters, bulk-select action toolbar,
  paginated table, slide-in detail drawer (wallet · representative roster · actions),
  currency-grant modal, account-sanction modal, and filtered CSV export.
- **쿠폰 관리 (Coupons)** — registry table with usage bars, state-backed create/edit form,
  reward builder (item ID + quantity), and a live issuance summary.
- **게임 로그 (Game Log)** — behaviour KPIs, content-usage list with expandable per-segment
  breakdowns, level-distribution histogram, average currency holdings, stage-chapter progress, CSV.
- **결제 로그 (Payment Log)** — sales summary cards, hour/day/week/month revenue graph toggle,
  and a revenue-sorted per-product table with share bars + CSV.
- **우편 / 보상 (Mail)** — compose (title/body/target + custom user-IDs/schedule/reward builder/
  summary) with state-backed immediate or reserved send, plus a send-history list.
- **뽑기 설정 (Gacha)** — banner tabs (픽업/유닛/통합), per-rarity rate table, editable hard/soft
  pity per banner, and a pickup-character selector.
- **운영 인텔리전스 (Ops Intelligence)** — enterprise governance + intelligence: RBAC role card
  (reflects the topbar switcher), Maker-Checker approval queue, threshold alert rules with a live
  active/paused toggle, auto segments, cohort retention, A/B test board, integration status, a
  **metrics logging-requirements spec**, and a **CSV-derived content/meta tracking board**.
- **캐릭터 / 유닛 (Characters)** — the **real ProjectA roster (45 units, parsed from `UnitMaster.csv`)**
  with rarity/element distribution charts, rarity + element filters, and a detail drawer showing the
  actual base stats (HP/ATK/DEF/Speed) and rarity level caps (from `GameConstMaster`).
- **로그 / 모니터링 (Logs)** — operator audit log with a type filter (재화/제재/쿠폰/우편).
- **종합 보고서 (Report)** — printable executive report aggregating monetization, game, payment, and
  liveops metrics with an executive summary (print/PDF via `@media print`).
- **이벤트 (Events)** — event cards with on/off toggle + edit modal, a 14-day attendance reward grid,
  and a bulk reward editor (per-day quantity + multiplier).
- **일차 · 누적 보상 (Idle Rewards)** — idle reward tiers + a max-accumulation-hours slider with preview.
- **상점 / 패키지 (Shop)** — package grid with forced-sales master switch + per-package on/off, plus
  season/premium pass cards.
- **미션 / 업적 (Missions)** — daily/weekly/achievement tabs, per-mission ON/OFF toggle, and edit modal.
- **KPI** — revenue simulator (DAU/ARPDAU/conversion sliders → ₩ month/year), editable KPI targets vs.
  current, and a BEP scenario simulator (5 presets, 8 sliders, 12-month cumulative-profit chart).
- **지식베이스 (Knowledge)** — searchable 80-term monetization glossary across 10 categories with
  definitions, formulas, and low/median/high benchmarks.

## Architecture

```
src/
  theme/tokens.ts          design tokens (palette, currency/element/rarity)
  lib/                     format, server-state, user, dashboard/gamelog/payment helpers
  icons/Icon.tsx           single path-driven stroke-icon component
  data/                    seed/static data (nav, users, coupons, dashboard, mail, gacha,
                           characters, gamelog, payments, intel, logging, contentTracking,
                           projectUnits — real ProjectA UnitMaster roster)
  store/useStore.ts        Zustand store — full state + immutable actions
  components/
    layout/                Sidebar · Topbar · AppShell
    ui/                    HoverBox · Toast · NoticePopup · PageHeader · RewardBuilder
    dashboard/             server control · notice · KPIs · charts · metrics · bottom row
    users/                 filter bar · bulk toolbar · table · detail drawer · grant/ban modals
    coupons/               list · create
    mail/                  compose · list
    gamelog/               content-usage accordion · KPI/level/holdings/chapter panels
    payments/              revenue graph · product table
    intel/                 RBAC · approvals · alert rules · segments/cohort · A/B/integrations
                           · logging spec · CSV content-tracking board
    character/             roster distribution charts · unit detail drawer
  pages/                   Dashboard · Users · Coupons · Mail · Gacha · GameLog · Payments ·
                           Intel · Character · Placeholder
```

- **State**: a single Zustand store holds shell, dashboard, user, and coupon state; all updates
  are immutable (new objects, never mutation). Display values are derived in components/selectors.
- **Styling**: the prototype's exact pixel values, recreated with inline styles referencing the
  typed `tokens` palette. A small `HoverBox` bridges the prototype's `style-hover` into React.
- **Fonts**: Pretendard (UI) + JetBrains Mono (numerics), loaded via CDN in `index.html`.

## Notes

- Data is client-state only — it resets on reload (KPI/sim settings persist via `localStorage`
  in the prototype; that hook can be re-added per module as screens are built out).
- Charts/metrics use mock values; swap the `data/` feeds for real metric sources in production.

### Known issue — `npm run build` on this machine

`npm run dev` and `tsc -b` (type-check) both pass cleanly and the app runs fully. However,
`npm run build` crashes during Vite's bundle/generate step with a Windows native fast-fail
(`exit code 0xC0000409`) **after** all 98 modules transform. It reproduces identically with the
native Rollup binary, with the WASM Rollup build (`@rollup/wasm-node`), and with minification
disabled — so it is **not** the application code (TypeScript is clean and every module
transforms) but an environment-level native crash in the build toolchain.

Most likely causes & fixes (in order of likelihood):

1. **OneDrive sync / antivirus** interfering with native binaries on this synced, non-ASCII
   path. Copy the project to a plain local path (e.g. `C:\dev\AdminTool`) and build there, or
   pause OneDrive / add a Defender exclusion for the folder, then `npm run build`.
2. **Node v24** is very new; building under an LTS (Node 20 or 22) often avoids native-addon
   fast-fails.

The dev server is unaffected by all of the above.
