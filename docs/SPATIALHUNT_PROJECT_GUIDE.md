# SpatialHunt — Project Guide

SpatialHunt is a Nigerian verified-property marketplace: **Verified Homes. Direct To Landlords. Zero Stress.**

This repository contains the Next.js App Router frontend/backend API for the public website, tenant experience, landlord experience, admin operations, and a future property-manager portal.

## Product principles

1. **Trust first** — verification status is always visible.
2. **Reduce anxiety** — payment and verification states must be unambiguous.
3. **Nigerian context** — ₦ formatting, local address conventions, Lagos-first examples in mocks.
4. **Extend, don’t redesign** — preserve existing public pages and design language.
5. **No fake production APIs** — use service abstractions + TODO + labeled mocks.

## Architecture overview

| Layer | Implementation |
| --- | --- |
| UI | React 19 + Next.js 16 App Router |
| Styling | Tailwind CSS v4, Manrope, inline SpatialHunt tokens |
| Auth | JWT Bearer (`lib/auth.ts` server, `lib/auth-client.ts` client sessionStorage) |
| Primary data | PostgreSQL + Prisma 7 |
| Messaging | MongoDB + Mongoose |
| Validation | Zod |
| Client API | `lib/services/*` |

## Folder structure

```
app/
  (website)/     Public marketing + auth pages (Header/Footer)
  dashboard/     Existing tenant dashboard (/dashboard/tenant)
  tenant/        PRD aliases redirecting to /dashboard/tenant
  landlord/      Landlord app
  admin/         Operations app
  portal/        Property manager scaffolds
  api/           REST route handlers
component/       UI (singular folder name — keep it)
lib/             Auth, prisma, mongo, validation, services, types
mocks/           Centralized demo data
docs/            Project documentation
prisma/          Schema
public/          Static assets / icons
```

## User roles

- `TENANT` — search, save, message, inspect, pay (escrow UI)
- `LANDLORD` — verify, list, inquire, inspect, payments
- `ADMIN` — moderation, verification queue, disputes, audit
- Future: property manager / agent via `/portal` (coming soon)

Public signup only exposes Tenant and Landlord.

## How to run locally

```bash
cd spatialhunt
npm install
cp .env.example .env   # create if missing; see Environment
npx prisma generate
npm run dev
```

Open http://localhost:3000

### Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection for Prisma |
| `JWT_SECRET` | Sign/verify access tokens |
| `MONGO_URI` | Messaging conversations/messages |

Never commit secrets. Never store NIN in localStorage/sessionStorage.

## Scripts

| Script | Command |
| --- | --- |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start | `npm run start` |
| Lint | `npm run lint` |
| Types | `npx tsc --noEmit` |
| Prisma client | `npx prisma generate` |

## Routing conventions

- Public paths often use concatenated names (`/howitworks`, `/listproperty`) — preserve them.
- Tenant product lives at **`/dashboard/tenant/*`** (existing). PRD `/tenant/*` aliases redirect where added.
- New apps: `/landlord/*`, `/admin/*`, `/portal/*`.

See `docs/SPATIALHUNT_ROUTES.md`.

## Backend assumptions

Many API routes already exist under `app/api`. UI services call those paths only. Where an endpoint is missing (password reset, email verify), the service method is stubbed with a TODO.

Escrow UI explains the lifecycle but **does not claim** the frontend is a licensed escrow provider.

## Documentation index

- `IMPLEMENTATION_AUDIT.md` — what existed before extension
- `SPATIALHUNT_ROUTES.md`
- `SPATIALHUNT_COMPONENTS.md`
- `SPATIALHUNT_DESIGN_SYSTEM.md`
- `SPATIALHUNT_DATA_MODEL.md`
- `SPATIALHUNT_API_CONTRACTS.md`
- `SPATIALHUNT_AUTHORIZATION.md`
- `SPATIALHUNT_AI_AGENT_GUIDE.md`
- `SPATIALHUNT_MVP_SCOPE.md`
- `IMPLEMENTATION_STATUS.md`

## Deployment

Standard Next.js build/start. Configure env vars on the host. Ensure Postgres + Mongo are reachable for full functionality; UI can still render with labeled mock fallbacks when APIs fail.
