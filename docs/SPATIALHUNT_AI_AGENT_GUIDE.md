# SpatialHunt — AI Agent Guide

> **The repository is the source of truth for implementation. The PRD is the source of truth for product intent. Existing working functionality must not be destroyed merely to satisfy a new implementation preference.**

This guide is for Cursor, Claude Code, Copilot, Kiro, and other coding agents.

## Mandatory rules

1. Inspect the repository before modifying it.
2. Never recreate existing components without checking `component/` first.
3. Never introduce a new design system or UI framework (no shadcn/MUI unless explicitly requested).
4. Never change existing public routes (`/`, `/properties`, `/howitworks`, `/about`) without checking dependents.
5. Preserve existing functionality and visual language (Evergreen `#1E5A4F`, Amber `#F4B942`, Manrope).
6. Use existing components whenever possible.
7. Follow folder conventions: `component/` (singular), `app/`, `lib/services/`, `mocks/`, `docs/`.
8. Follow naming already used (`/howitworks`, `/listproperty`, `/dashboard/tenant`).
9. Never invent backend API endpoints — extend `lib/services` with TODO stubs instead.
10. Never expose secrets or commit `.env` files.
11. Never store NIN or sensitive verification data in localStorage/sessionStorage.
12. Keep admin functionality separate from public marketing pages.
13. Maintain role-based access patterns already established.
14. Keep MVP vs future features separate — use Coming soon / feature flags, don’t fake AI/3D/reviews as live.
15. Update documentation when architecture/routes/components change.
16. Update `SPATIALHUNT_ROUTES.md` whenever routes change.
17. Update `SPATIALHUNT_COMPONENTS.md` when reusable components are introduced.
18. Run lint / `tsc` / build after meaningful changes.
19. Do not leave broken imports.
20. Do not leave dead unreachable routes.
21. Do not silently remove functionality.
22. Do not replace working code simply because another implementation is preferred.
23. Ask for clarification only when absolutely necessary; otherwise follow documented product decisions.

## Working order

Prefer Priority 1 (auth, tenant, landlord verification/listings) before polishing portal/admin charts.

## Before you edit

Read:

1. `docs/IMPLEMENTATION_AUDIT.md`
2. `docs/SPATIALHUNT_DESIGN_SYSTEM.md`
3. `docs/SPATIALHUNT_ROUTES.md`
4. Relevant existing page/component

## Data & services

- Wire UI through `lib/services/*`
- Centralize demo data in `mocks/`
- Label demo data in the UI
- Prisma enums are source of truth for statuses

## Next.js note

This project uses **Next.js 16** — check local `node_modules/next/dist/docs/` when unsure about APIs (see `AGENTS.md`).
