# SpatialHunt — Data Model

Aligned with `prisma/schema.prisma` + Mongo messaging schemas.

## Entities

### User (Postgres) — **private / role-scoped**
- id, email (unique), passwordHash, fullName, phone?, role (`TENANT|LANDLORD|ADMIN`), isVerified, timestamps
- Relations: properties, verifications, favorites, bookings, notifications, auditLogs

### Property — **public when VERIFIED**; otherwise owner/admin
- Core listing fields, amenities `String[]`, status enum, furnishing, pricePeriod, listingIntent, optional lat/lng, landmarks JSON
- photos: PropertyPhoto (url, isWalkthroughVideo, order)

### Verification — **private** (owner + admin)
- type: `LANDLORD_ID` | `PROPERTY_WALKTHROUGH`
- status: PENDING | APPROVED | REJECTED
- documentUrl, reviewNotes, reviewedById?, reviewedAt?
- **Sensitive:** treat identity docs as sensitive; never render full NIN in UI; never store NIN in browser storage

### Favorite — **private (tenant)**
- unique (userId, propertyId)

### Booking (Inspection) — **private (tenant + landlord)**
- scheduledAt, status: REQUESTED | CONFIRMED | DECLINED | RESCHEDULED | COMPLETED

### EscrowTransaction — **private (parties + admin)**
- amount, status lifecycle through funded → inspection → keys → agreement → released / refunded / disputed
- paystackReference?

### Notification — **private**
- type, message, relatedId?, isRead

### AuditLog — **admin-only**
- action, entityType, entityId, metadata JSON — UI must not allow arbitrary deletion

### Conversation / Message (Mongo) — **private participants**
- Conversation: propertyId, tenantId, landlordId
- Message: conversationId, senderId, content, isRead

## Frontend-only / future models

- `SavedSearch` — UI + mocks today; no Prisma model yet
- `Dispute` — admin UI + mocks; persist later
- Portal team/agreements — coming soon

## Sensitivity legend

| Class | Examples | Rules |
| --- | --- | --- |
| Public | Verified listing title, price, city, amenities, walkthrough for verified | OK on marketing/search |
| Private | Messages, bookings, escrow, favorites | Auth + ownership |
| Admin-only | Audit logs, dispute internals, raw verification queue | ADMIN role |
| Sensitive | NIN, ownership docs, identity media | Mask; no localStorage; no public URLs |
