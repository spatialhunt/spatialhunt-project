# SpatialHunt — Routes

| Route | Role | Purpose | Status | Backend Required |
| ----- | ---- | ------- | ------ | ---------------- |
| `/` | Public | Marketing home | Complete (existing) | No |
| `/properties` | Public | Browse/search | Complete UI (mock) | Optional `/api/properties` |
| `/properties/:id` | Public | Property detail | Complete UI (mock) | Optional |
| `/howitworks` | Public | How it works | Complete | No |
| `/about` | Public | About | Complete | No |
| `/resources` | Public | Resources shell | Scaffolded | No |
| `/listproperty` | Public | Landlord CTA | Implemented | No |
| `/login` | Public | Sign in | Implemented | `/api/auth/login` |
| `/signup` | Public | Role picker | Implemented | No |
| `/signup/role` | Public | Alias → `/signup` | Implemented | No |
| `/signup/tenant` | Public | Tenant register | Implemented | `/api/auth/register` |
| `/signup/landlord` | Public | Landlord register | Implemented | `/api/auth/register` |
| `/forgot-password` | Public | Reset request UI | UI + TODO service | Future |
| `/reset-password` | Public | Reset form UI | UI + TODO service | Future |
| `/verify-account` | Public | Verify code UI | UI + TODO service | Future |
| `/logout` | Public | Clear session | Implemented | No |
| `/dashboard/tenant` | Tenant | Tenant home | Complete (existing) | Optional |
| `/dashboard/tenant/saved-properties` | Tenant | Saved homes | Implemented | `/api/favorites` |
| `/dashboard/tenant/saved` | Tenant | Alias → saved-properties | Implemented | — |
| `/dashboard/tenant/saved-searches` | Tenant | Saved search alerts | UI (local/mock) | Future |
| `/dashboard/tenant/enquiries` | Tenant | Enquiries | Scaffolded | Future |
| `/dashboard/tenant/applications` | Tenant | Applications | Scaffolded | Future |
| `/dashboard/tenant/messages` | Tenant | Inbox | Implemented | Mongo messages APIs |
| `/dashboard/tenant/messages/:id` | Tenant | Conversation | Implemented | Mongo messages APIs |
| `/dashboard/tenant/inspections` | Tenant | Inspections list | Implemented | `/api/bookings/mine` |
| `/dashboard/tenant/inspections/:id` | Tenant | Inspection detail | Implemented | `/api/bookings/:id/status` |
| `/dashboard/tenant/payments` | Tenant | Escrow list | Implemented | `/api/escrow/mine` |
| `/dashboard/tenant/payments/:id` | Tenant | Payment timeline | Implemented | Escrow APIs |
| `/dashboard/tenant/notifications` | Tenant | Notifications | Implemented | `/api/notifications` |
| `/dashboard/tenant/documents` | Tenant | Documents (privacy-safe) | Scaffolded | Future |
| `/dashboard/tenant/profile` | Tenant | Profile | UI | Future profile API |
| `/dashboard/tenant/settings` | Tenant | Settings hub | Implemented | No |
| `/dashboard/tenant/security` | Tenant | Security | UI + TODO | Future |
| `/dashboard/tenant/preferences` | Tenant | Search preferences | UI local | Future |
| `/dashboard/tenant/help` | Tenant | Help | Scaffolded | No |
| `/tenant` | Alias | → `/dashboard/tenant` | Implemented | — |
| `/tenant/dashboard` | Alias | → `/dashboard/tenant` | Implemented | — |
| `/landlord` | Landlord | → dashboard | Implemented | Auth |
| `/landlord/dashboard` | Landlord | Task-first home | Implemented | properties/verifications/bookings |
| `/landlord/verification` | Landlord | Verification wizard | Implemented | `/api/verifications` |
| `/landlord/verification/status` | Landlord | Status | Implemented | `/api/verifications/mine` |
| `/landlord/verification/resubmit` | Landlord | Resubmit | Implemented | verifications |
| `/landlord/listings` | Landlord | Listings table | Implemented | `/api/properties/mine` |
| `/landlord/listings/new` | Landlord | Create wizard | Implemented | `/api/properties` |
| `/landlord/listings/:id` | Landlord | Listing detail | Implemented | properties |
| `/landlord/listings/:id/edit` | Landlord | Edit wizard | Implemented | properties |
| `/landlord/inquiries` | Landlord | Inquiries | Scaffolded | messages |
| `/landlord/inquiries/:id` | Landlord | Inquiry detail | Scaffolded | messages |
| `/landlord/inspections` | Landlord | Inspections | Implemented | bookings landlord |
| `/landlord/inspections/:id` | Landlord | Inspection actions | Implemented | bookings status |
| `/landlord/messages` | Landlord | Inbox | Implemented | messages |
| `/landlord/messages/:id` | Landlord | Chat | Implemented | messages |
| `/landlord/analytics` | Landlord | Analytics (demo/empty) | Scaffolded | Future |
| `/landlord/payments` | Landlord | Payments | Scaffolded | escrow |
| `/landlord/billing` | Landlord | Billing | Scaffolded | Future pricing |
| `/landlord/notifications` | Landlord | Notifications | Scaffolded | notifications |
| `/landlord/profile` | Landlord | Profile | Scaffolded | Future |
| `/landlord/settings` | Landlord | Settings | Scaffolded | Future |
| `/admin` | Admin | → dashboard | Implemented | Auth ADMIN |
| `/admin/dashboard` | Admin | Ops KPIs | Scaffolded (demo labeled) | Future aggregates |
| `/admin/users` | Admin | User moderation | Scaffolded | Future |
| `/admin/users/:id` | Admin | User detail | Scaffolded | Future |
| `/admin/properties` | Admin | Property moderation | Scaffolded | properties |
| `/admin/properties/:id` | Admin | Property review | Scaffolded | properties |
| `/admin/verifications` | Admin | Verification queue | Implemented | pending + review |
| `/admin/verifications/:id` | Admin | Review decision | Implemented | review |
| `/admin/disputes` | Admin | Disputes | Scaffolded | Future |
| `/admin/disputes/:id` | Admin | Dispute detail | Scaffolded | Future |
| `/admin/transactions` | Admin | Transactions | Scaffolded | escrow |
| `/admin/transactions/:id` | Admin | Transaction detail | Scaffolded | escrow |
| `/admin/reports` | Admin | Reports | Scaffolded | Future |
| `/admin/audit-logs` | Admin | Audit trail | Scaffolded | audit_logs |
| `/admin/settings` | Admin | Ops settings | Scaffolded | Future |
| `/portal/*` | PM / future | Coming soon IA | Scaffolded | Future |
| `/dashboard/hunters` | Unknown | Legacy stub | Leave | — |

**Note:** Frontend route guards are UX only. APIs enforce roles via JWT.
