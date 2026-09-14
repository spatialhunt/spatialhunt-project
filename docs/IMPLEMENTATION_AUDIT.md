# SpatialHunt — Implementation Audit

**Audited:** 2026-09-14  
**Codebase:** `/spatialhunt` (Next.js App Router)  
**Public site reference:** https://www.thespatialhunt.com/  
**PRD:** `SpatialHunt PRD 2.docx`

> Repository is the source of truth for implementation. The PRD is the source of truth for product intent. Existing working functionality must not be destroyed merely to satisfy a new implementation preference.

---

## Executive Summary

SpatialHunt already has a **strong public marketing site**, a **polished tenant dashboard shell**, a **rich backend API layer** (Prisma/Postgres + Mongo messaging), and a **clear visual design language** (Evergreen + Amber). Most authenticated product surfaces (auth forms, landlord app, inspections UI, payments UI, admin/ops, portal) are **missing or stubs**, while several APIs for those features already exist.

**Strategy:** Extend — do not redesign. Preserve public pages and the existing tenant dashboard. Implement missing routes under existing URL conventions where they already exist (`/dashboard/tenant/*`), and introduce `/landlord/*`, `/admin/*`, `/portal/*` for new experiences. Wire UI to existing API abstractions; use mocks only where APIs cannot be called yet.

---

## Tech Stack (Discovered)

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16.3.1** (App Router) |
| UI | **React 19.2.8** |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` in `app/globals.css`) — no separate `tailwind.config` tokens file; colors are inline |
| Font | **Manrope** via `next/font/google` |
| Icons | Static SVGs in `/public` (no Lucide/Heroicons package) |
| Validation | **Zod 4** |
| Auth | **JWT** (`jsonwebtoken` + `bcrypt`) — Bearer token via `Authorization` header |
| Primary DB | **PostgreSQL** via **Prisma 7** (`@prisma/adapter-pg`) |
| Messaging DB | **MongoDB** via **Mongoose** (Conversation / Message schemas) |
| Payments intent | Escrow APIs reference **Paystack** (`paystackReference` field) |
| Component library | **None** (no shadcn/MUI/Chakra) — custom components |
| State management | **None** (local React state only) |
| Client API layer | **None yet** — fetch calls not centralized |
| Tests | **None configured** |
| Docs | **None** prior to this audit |

**Do not introduce** a new UI framework, CSS system, or state library unless a concrete gap requires it.

---

## Folder Conventions

```
app/
  (website)/          # Public site layout (Header + Footer)
  dashboard/tenant/   # Tenant dashboard (existing)
  dashboard/hunters/  # Stub — unclear purpose
  api/                # Route handlers (REST-style)
component/            # UI components (singular folder name — keep it)
lib/                  # Auth, prisma, mongo, validation, ownership helpers
prisma/               # Schema
public/               # Assets / icons
```

**Naming notes:**
- Folder is `component/` not `components/` — follow this.
- Some folders use spaces: `component/How it works/` — do not rename casually.
- Public routes use lowercase concatenated paths: `/howitworks`, `/listproperty` (not kebab-case).

---

## Existing Pages

| Route | Purpose | Major components | Status | Modify? |
| --- | --- | --- | --- | --- |
| `/` | Marketing home | `Showcase`, `Showsection`, `SalesSection`, `HowItWorks`, `FeatureProperties`, `Features2`, `LandLord`, `Testimony` | **Complete (UI)** | Preserve |
| `/properties` | Browse / search listings | `Hero`, `Filter`, `AllSearch`, `RefineSearch`, `PropertyResults`, `Aside`, `PropertyCard` | **Complete (UI, mock data)** | Soft-wire to API later; do not redesign |
| `/properties/[id]` | Property detail | Large inline page (~1.7k lines), gallery, amenities, CTAs | **Complete (UI, hardcoded mock)** | Preserve; optional API hook later |
| `/howitworks` | How it works | `HowItWorksHero`, `JourneySelector`, `JourneyCards`, `TrustStats`, `GetStarted` | **Complete** | Preserve |
| `/about` | About us | `AboutHero`, `MissionVisionValues`, `WhyWeExist`, `AboutGetStarted` | **Complete** | Preserve |
| `/resources` | Resources | Placeholder text only | **Stub** | Implement lightly or content shell |
| `/login` | Login | Placeholder text only | **Stub** | **Replace with real auth UI** |
| `/listproperty` | List your property CTA | Placeholder text only | **Stub** | Redirect/CTA into landlord onboarding |
| `/dashboard/tenant` | Tenant home dashboard | `TenantHero`, `TenantSidebar`, stats, recommended, enquiries, account, activity, quick actions | **UI complete, mock data, no auth gate** | Preserve layout; enhance sections carefully |
| `/dashboard/hunters` | Unknown | Placeholder | **Stub** | Leave or map later; do not expose in nav |

### Tenant sidebar routes (linked but **not implemented**)

| Sidebar href | Exists? |
| --- | --- |
| `/dashboard/tenant/saved-properties` | No |
| `/dashboard/tenant/enquiries` | No |
| `/dashboard/tenant/applications` | No |
| `/dashboard/tenant/messages` | No |
| `/dashboard/tenant/payments` | No |
| `/dashboard/tenant/documents` | No |
| `/dashboard/tenant/profile` | No |
| `/dashboard/tenant/help` | No |
| `/verification` (sidebar CTA) | No |

### PRD route mapping (decision)

| PRD route | Actual repo route (adopted) | Rationale |
| --- | --- | --- |
| `/tenant`, `/tenant/dashboard` | `/dashboard/tenant` | Existing production path + sidebar |
| `/tenant/saved` | `/dashboard/tenant/saved-properties` (+ alias `/dashboard/tenant/saved`) | Match sidebar |
| `/tenant/messages` | `/dashboard/tenant/messages` | Match sidebar |
| `/tenant/inspections` | `/dashboard/tenant/inspections` | New; maps to Booking API |
| `/tenant/payments` | `/dashboard/tenant/payments` | Match sidebar |
| `/tenant/*` preferences/settings | `/dashboard/tenant/profile`, `/settings`, `/security`, `/preferences` | Extend under dashboard |
| `/landlord/*` | `/landlord/*` | New (no existing landlord UI) |
| `/admin/*` | `/admin/*` | New |
| `/portal/*` | `/portal/*` | New (coming-soon scaffolds) |
| `/signup`, `/forgot-password`, etc. | Under `(website)/` | New auth pages |

Optional redirects from PRD-style `/tenant/*` → `/dashboard/tenant/*` may be added for compatibility.

---

## Existing Components

### Layout / chrome
- `component/header.tsx` — public nav
- `component/footer.tsx` — public footer
- `component/tenant-dashboard/tenantHero.tsx` — tenant top bar + search
- `component/tenant-dashboard/tenantSidebar.tsx` — tenant nav (Evergreen panel)

### Property
- `component/properties/propertycard.tsx` — list-row card (untyped props)
- `component/properties/propertyresult.tsx`, `filter.tsx`, `hero.tsx`, `aside.tsx`, `allsearch.tsx`, `refinesearch.tsx`

### Tenant dashboard widgets
- `dashboardStats`, `recommended`, `myEnquiry`, `accountOverview`, `recentActivity`, `quickActions`

### Marketing sections
- Home, About, How it works section components under `component/home`, `component/about`, `component/How it works`

### Missing shared system components
No reusable: `Button`, `Input`, `Modal`, `Toast`, `EmptyState`, `LoadingState`, `ErrorState`, `ConfirmationModal`, `Tabs`, `Table`, `Badge` primitives, `VerificationBadge` as a shared export, layouts for landlord/admin.

**Rule:** Extract shared UI only when needed; style them to match existing Tailwind patterns. Prefer composing from existing patterns over inventing a second design system.

---

## Existing Design System (from code)

### Colors (actual hex values in use)

| Token (conceptual) | Hex | Usage |
| --- | --- | --- |
| Evergreen primary | `#1E5A4F` | Brand text, CTAs, sidebar, trust |
| Evergreen hover/dark | `#17483F` | Hover on green buttons |
| Evergreen mid | `#1B6345` | Sidebar accents |
| Evergreen translucent | `#117E2540` | Active nav pills |
| Verified / success green | `#117E25`, `#378653` | Success text / badges |
| Success soft bg | `#DDF2E4`, `#F0F7F4`, `#EAF3F0` | Soft success surfaces |
| Amber primary | `#F4B942` / `#F4B940` | Accent CTA, brand “SPATIAL”, alerts |
| Amber hover text | `#C58D16` | Nav hover text |
| Amber soft | `#FFF4D6`, `#FFF6D9` | Hover / pending badge bg |
| Amber badge text | `#C99A20` | Needs-attention status |
| Body text | `#2E2E2E` | Primary copy |
| Muted | `#777777`, `#8A8A8A`, `#9A9A9A`, `#A0A0A0` | Secondary |
| Borders | `#EAEAEA`, `#E5E5E5`, `#EEEEEE`, `#DDDDDD` | Dividers |
| Page wash | `#FAFAF8` | Soft section backgrounds |
| Sidebar muted text | `#D8E4E1`, `#C9D8D4` | On evergreen |
| White | `#FFFFFF` | Surfaces |

**PRD alignment:** Evergreen = verified/trust; Amber = ratings, alerts, needs-attention. Preserve.

### Typography
- Font family: **Manrope** (global)
- Weights: medium / semibold / bold heavily used
- Scale: mostly `text-xs` → `text-lg` with occasional larger marketing headlines

### Spacing / radius / shadow
- Page gutters: `px-4` → `xl:px-12`, max widths `max-w-7xl` / `max-w-[1400px]`
- Radius: typically `rounded-[5px]`–`rounded-[8px]`, `rounded-lg`, `rounded-md` — **not** pill-heavy
- Shadows: light (`shadow-lg` on mobile menu); cards often border-based, not heavy multi-layer shadows

### Buttons (patterns)
- Primary amber: `bg-[#F4B942] text-[#1E5A4F] font-semibold rounded-[5px]`
- Primary evergreen: `bg-[#1E5A4F] text-white`
- Ghost/outline: border `#DDDDDD` hover border evergreen

### Cards
- Soft wash `#FAFAF8`, border `#EEEEEE`, radius ~8px
- Property list cards are horizontal (image + meta), not generic SaaS cards

### Breakpoints
- Tailwind defaults: `sm` `md` `lg` `xl` `2xl`
- Tenant: mobile-first with collapsible sidebar
- Public header: `md` breakpoint for desktop nav

### Animation
- `transition-all duration-200`, light `hover:scale-[1.02]` / `group-hover:scale-105`
- Avoid decorative dashboard motion

---

## Existing Technical Architecture

### Routing
- Next.js App Router file-based routes
- Route group `(website)` wraps public pages with Header/Footer
- Dashboard pages sit outside website layout (own chrome via `TenantHero`)

### Authentication
- `POST /api/auth/register` — email, password (≥8), fullName, optional phone, role `TENANT` | `LANDLORD`
- `POST /api/auth/login` — returns `{ accessToken, userId, email, role }`
- `lib/auth.ts` — `getAuthUser(req)` verifies JWT from Bearer header
- **No** middleware, cookie session, refresh tokens, forgot-password, or email verify APIs yet
- **No** client-side auth store; logout in sidebar is `console.log`

### API layer (backend exists)

| Area | Routes |
| --- | --- |
| Auth | `/api/auth/login`, `/api/auth/register` |
| Properties | CRUD-ish: list (verified), create, get/update `[id]`, submit, photos |
| Verifications | create, mine, pending (admin), `[id]/review` |
| Favorites | list, add/remove by propertyId |
| Bookings (inspections) | create, mine, landlord, `[id]/status` |
| Escrow | create, mine, fund, confirm-inspection/keys/agreement, release |
| Messages | conversations list/detail, send message (Mongo) |
| Notifications | list, mark read, read-all |

### Data model (Prisma) highlights
- Roles: `TENANT`, `LANDLORD`, `ADMIN`
- Property statuses: `DRAFT`, `PENDING_VERIFICATION`, `VERIFIED`, `REJECTED`, `RENTED`
- Verification types: `LANDLORD_ID`, `PROPERTY_WALKTHROUGH` (ownership docs likely via document URL)
- Booking statuses: `REQUESTED`, `CONFIRMED`, `DECLINED`, `RESCHEDULED`, `COMPLETED`
- Escrow statuses: `PENDING` → `FUNDED` → … → `RELEASED` / `REFUNDED` / `DISPUTED`
- AuditLog + Notification models exist

### Messaging
- Separate Mongo collections; not in Prisma

### Environment variables (expected)
- `DATABASE_URL` — Postgres
- `JWT_SECRET` — auth signing
- `MONGO_URI` — messaging
- No `.env` committed (correct)

### Deployment
- Standard Next.js (`next build` / `next start`); README still default create-next-app text

---

## Missing Features (vs PRD / this brief)

### Priority 1 — Core conversion
- [ ] Auth UI: login, signup (+ role), forgot/reset/verify-account
- [ ] Tenant subpages linked from sidebar (saved, messages, payments, profile, …)
- [ ] Inspections UI (tenant + landlord) — API exists as bookings
- [ ] Landlord dashboard, verification wizard, listing wizard, listings management
- [ ] Client service abstractions + auth session helper
- [ ] Role-based route protection (middleware / layout guards)

### Priority 2 — Transaction
- [ ] Tenant/landlord payments UI over escrow APIs
- [ ] Notifications page
- [ ] Profile / settings / security / preferences
- [ ] Admin verification queue UI (API pending/review exists)

### Priority 3 — Operations
- [ ] Admin dashboard, users, properties, disputes, transactions, audit logs, settings

### Priority 4 — Scale
- [ ] Property manager / developer portal scaffolds (coming soon)

### Shared product quality
- [ ] Shared Loading / Empty / Error / Unauthorized / Confirmation states
- [ ] Centralized mocks where UI needs demo data
- [ ] Project documentation suite
- [ ] Wire public property list/detail to API (optional later; currently mock)

---

## What Must Not Be Broken

1. Home, Properties, Property Detail, How It Works, About visual design and structure
2. Tenant dashboard layout (`TenantHero` + `TenantSidebar` + grid)
3. Existing API route contracts and Prisma schema enums (extend carefully)
4. Design tokens (Evergreen / Amber) and Manrope typography
5. `component/` folder naming and public SVG asset usage

---

## Concise Implementation Plan

### Batch 1 — Foundations
1. Shared states, confirmation modals, status badges
2. `lib/types`, `lib/services/*` wrapping existing APIs (no invented endpoints)
3. Auth client helper (token storage strategy: memory + `sessionStorage` — **never** store NIN)
4. Role layouts: Tenant (reuse), Landlord, Admin, Portal
5. Write core docs from this audit

### Batch 2 — Auth + Tenant
1. Real `/login`, `/signup` (+ role/tenant/landlord), forgot/reset/verify shells
2. Implement sidebar-linked tenant pages with mock+service pattern
3. Inspections, saved, messages, payments shells wired to services

### Batch 3 — Landlord
1. `/landlord/dashboard`, verification flow, listings table, new/edit wizard
2. Inquiries, inspections, messages, analytics (honest empty/demo), payments/billing

### Batch 4 — Messaging / inspections / payments polish
1. Conversation UI + inspection detail + payment timeline components

### Batch 5 — Admin
1. Ops layouts + verification queue + moderation + disputes + transactions + audit

### Batch 6 — Portal
1. Coming-soon IA under `/portal/*`

### Batch 7 — QA + docs
1. lint / typecheck / build
2. `IMPLEMENTATION_STATUS.md` + remaining docs

---

## Risks & Notes

- **Dual DB:** UI messaging must use Mongo-backed APIs; do not put messages in Prisma.
- **Login is stub:** Highest conversion gap.
- **PropertyCard untyped:** Add types when touching; avoid drive-by rewrite of all property pages.
- **No middleware yet:** Frontend guards are UX only; APIs already enforce roles.
- **`/dashboard/hunters`:** Leave stub; unclear product meaning.
- **Footer link** `/HowItWorks` is inconsistent with `/howitworks` — fix only when touching footer.
