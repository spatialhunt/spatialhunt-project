# SpatialHunt — Authorization

Frontend gates are **UX only**. Backend JWT role checks are authoritative.

## Roles

| Role | Signup | Surfaces |
| --- | --- | --- |
| TENANT | Yes | `/dashboard/tenant/*` |
| LANDLORD | Yes | `/landlord/*`, portal soft-access |
| ADMIN | No (ops provisioned) | `/admin/*` |

## Tenant permissions

- Browse public verified properties
- Save / unsave favorites
- Message landlords in-app (no default phone reveal)
- Request / view / cancel-or-reschedule inspections where permitted
- Initiate / view escrow payment status
- Manage profile preferences (UI)
- Receive notifications

## Landlord permissions

- Create/edit own listings
- Submit verification materials (ID + walkthrough)
- View own verification status / resubmit
- Respond to inquiries & messages
- Manage inspection accept/decline/reschedule/complete
- View payments/billing UI
- Access analytics placeholders

## Admin permissions

- Review verification queue (approve / reject / notes)
- Moderate users (suspend/reactivate — confirm dangerous actions)
- Moderate properties
- View/manage disputes workflow UI
- Inspect transactions
- View audit logs (no arbitrary delete in UI)
- Ops settings

## Property manager (portal)

Future: bulk upload, team roles, portfolio analytics, agreements. Currently **Coming soon** with soft landlord/admin shell access.

## Client enforcement

- `LandlordLayout` / `AdminLayout` / `PortalLayout` redirect unauthenticated users to `/login?next=...`
- Wrong role → `UnauthorizedState`
- Tenant layout blocks non-tenant sessions from tenant chrome
- APIs already return 401/403 via `getAuthUser` + role checks

## Security rules

- Never store NIN in localStorage/sessionStorage
- Never expose identity documents on public routes
- Never put secrets in frontend code
- Never trust client-supplied role for real authorization
- Soft-delete/archive listings preferred over careless duplication
