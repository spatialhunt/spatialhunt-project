# SpatialHunt — Components

## Rule

**Reuse first.** Folder is `component/` (singular). Do not create parallel `components/` trees or a second design system.

## Layout / chrome

| Component | Responsibility | Do not duplicate |
| --- | --- | --- |
| `component/header.tsx` | Public nav | Don’t rebuild public navbar |
| `component/footer.tsx` | Public footer | — |
| `component/tenant-dashboard/tenantHero.tsx` | Tenant top bar | — |
| `component/tenant-dashboard/tenantSidebar.tsx` | Tenant nav | Extend items carefully |
| `component/layout/TenantDashboardLayout.tsx` | Tenant page shell | Use for all tenant subpages |
| `component/layout/AppShells.tsx` | Landlord / Admin / Portal shells + soft RBAC | Don’t invent new app chrome |

## UI primitives (`component/ui/primitives.tsx`)

- `Button` — variants: `primary` | `secondary` | `amber` | `ghost` | `danger`
- `Input`, `Textarea`, `Select` — labeled, focus evergreen
- `PageHeader`, `Surface`

## Shared states (`component/shared/AppStates.tsx`)

`LoadingState`, `EmptyState`, `ErrorState`, `UnauthorizedState`, `NotFoundState`, `NetworkErrorState`, `SuccessState`, `VerificationPendingState`, `VerificationRejectedState`, `SkeletonBlock`

## Modals (`component/shared/ConfirmationModal.tsx`)

`ConfirmationModal`, `DeleteConfirmationModal`, `UnsavedChangesModal`

## Verification / status

`component/verification/StatusBadges.tsx` — Verified badge (evergreen), property/verification/inspection/payment status pills

## Property

| Component | Notes |
| --- | --- |
| `component/properties/propertycard.tsx` | Existing list-row card (typed) |
| `component/property/CompactPropertyCard.tsx` | Grid card for saved/recommended UIs |

## Messaging

`ConversationList`, `ChatWindow` in `component/messaging/Messaging.tsx`

## Payment

`PaymentTimeline` in `component/payment/PaymentTimeline.tsx`

## Landlord wizards

- `component/landlord/VerificationWizard.tsx` — NIN masked; cleared on submit; never persisted to storage
- `component/landlord/ListingWizard.tsx` — multi-step create/edit

## Auth

- `component/auth/LoginForm.tsx`
- `component/auth/SignupForms.tsx`

## Tenant dashboard widgets (existing)

`dashboardStats`, `recommended`, `myEnquiry`, `accountOverview`, `recentActivity`, `quickActions` — preserve; enhance only with care.

## What NOT to duplicate

- Do not add shadcn/MUI/Chakra.
- Do not create alternate button/input sets with new colors.
- Do not replace `PropertyCard` with a generic card library.
- Do not put API `fetch` calls inside leaf presentational components — use `lib/services`.
