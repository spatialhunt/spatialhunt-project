# SpatialHunt — API / Service Contracts

## Principle

Document **existing** HTTP routes. For missing capabilities, document **service method shapes** with TODO — do not invent fake production URLs.

Client wrappers live in `lib/services/*` and call only known `/api/...` paths.

## Auth

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/api/auth/register` | body: email, password (≥8), fullName, phone?, role TENANT\|LANDLORD → `{ accessToken, userId, email, role }` |
| POST | `/api/auth/login` | email, password → same token payload |

Service stubs (TODO backend):

- `authService.requestPasswordReset(email)`
- `authService.resetPassword(token, password)`
- `authService.verifyAccount(code)`

## Properties

| Method | Path | Auth |
| --- | --- | --- |
| GET | `/api/properties` | Public; filters city, minPrice, maxPrice, type, bedrooms; returns VERIFIED |
| POST | `/api/properties` | LANDLORD |
| GET/PATCH | `/api/properties/:id` | Ownership rules in route |
| POST | `/api/properties/:id/submit` | Owner submit for verification |
| POST/DELETE | `/api/properties/:id/photos`… | Owner |
| GET | `/api/properties/mine` | Landlord’s listings |

Service: `propertyService.getProperties|getProperty|getMine|create|update|submit|addPhoto`

## Verifications

| Method | Path | Auth |
| --- | --- | --- |
| POST | `/api/verifications` | Authenticated |
| GET | `/api/verifications/mine` | Self |
| GET | `/api/verifications/pending` | Admin queue |
| POST | `/api/verifications/:id/review` | Admin `{ status, reviewNotes? }` |

Service: `verificationService.submit|getMine|getPending|review`

## Favorites

| GET `/api/favorites` | POST/DELETE `/api/favorites/:propertyId` |

## Bookings (inspections)

| POST `/api/bookings` | GET `/api/bookings/mine` | GET `/api/bookings/landlord` | PATCH `/api/bookings/:id/status` |

Service: `inspectionService`

## Escrow / payments

| POST `/api/escrow` | GET `/api/escrow/mine` |
| POST `/api/escrow/:id/fund` | confirm-inspection | confirm-keys | confirm-agreement | release |

Service: `paymentService` — UI must not claim frontend is the escrow provider.

## Messages (Mongo)

| GET `/api/messages/conversations` | GET `/api/messages/conversations/:id` | POST `/api/messages` |

Service: `messagingService`

## Notifications

| GET `/api/notifications` | POST `/api/notifications/:id/read` | POST `/api/notifications/read-all` |

## Proposed future service methods (no endpoints yet)

- `getSavedSearches()`, `createSavedSearch()`, `updateSavedSearch()`, `deleteSavedSearch()`
- `getProfile()`, `updateProfile()`, `changePassword()`
- `listDisputes()`, `updateDispute()`
- `listAuditLogs(filters)`
- Admin aggregate `getOpsMetrics()`

## Auth header

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

Helpers: `lib/auth-client.ts` + `lib/services/http.ts` (`apiFetch`, `ApiError`).
