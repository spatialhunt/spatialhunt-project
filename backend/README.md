# SpatialHunt

A peer-to-peer rental marketplace built for the Nigerian housing market — connecting verified tenants directly with verified landlords, cutting out unlicensed agents, inflated fees, and the fraud risk that comes with the current rental process.

Built by Group 1 as part of Mentorship for Acceleration, Cohort 3.

## The problem

Finding a place to live in Nigeria too often means paying agency fees to unlicensed middlemen, paying to inspect a property that turns out not to exist, or gambling on a listing that's outright fraudulent. SpatialHunt exists to remove that risk from both sides of the transaction.

## How it works

- **Verified landlords, verified properties.** Every landlord completes ID verification before they can list. Every property goes through its own review — landlords submit a walkthrough video, not just photos, and an admin confirms it's genuine before the listing goes public.
- **Direct communication.** Tenants and landlords message each other inside the platform — no phone numbers exchanged just to ask about a listing.
- **Escrow-protected payments.** Rent doesn't go straight to the landlord. It sits in escrow until the tenant has inspected the property, received the keys, and signed the tenancy agreement — only then is it released.
- **Smart search.** Filter by budget, location, property type, bedrooms, and amenities instead of scrolling through irrelevant listings.

## Tech stack

**Backend:** NestJS (TypeScript), PostgreSQL via Supabase (Prisma ORM), MongoDB Atlas (messaging), JWT authentication
**Frontend:** Next.js
**Infrastructure:** Supabase (database + auth-adjacent tooling), MongoDB Atlas

## Project structure

```
spatialhunt-project/
├── app/            → frontend (Next.js)
├── component/       → frontend components
├── public/          → frontend static assets
├── backend/          → backend (NestJS)
│   ├── src/
│   ├── prisma/
│   └── ...
```

## Backend — current status

The backend covers the full core product loop, built and tested end-to-end against live databases (not just locally mocked):

| Module | What it does |
|---|---|
| Auth | Registration, login, JWT-based sessions, role-based access (tenant / landlord / admin) |
| Properties | Listings CRUD, ownership enforcement, photo & walkthrough video attachment, public search and filtering |
| Verification | Landlord ID and property walkthrough submission, admin review, automatic status updates on approval |
| Bookings | Tenants request property inspections; landlords accept, decline, or reschedule |
| Favorites | Save and unsave listings |
| Messaging | In-app conversations between tenant and landlord, scoped to a specific property |
| Escrow | Full state-machine-driven payment flow: funded → inspection confirmed → keys received → agreement signed → released, with each step validated before the next can happen |
| Notifications | In-app alerts triggered by key events (escrow funded, released, etc.) |

**Not yet built / next steps:** live payment processor integration (Paystack/Flutterwave — the escrow flow is fully built and ready to connect once sandbox credentials are in place), real file storage for photos/videos (currently URL-based), automated tests, hosting/deployment.

## Running the backend locally

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

Requires a `.env` file (not committed) with:
```
DATABASE_URL=
MONGO_URI=
JWT_SECRET=
PORT=3000
```

## Team

Backend developed by Seun. Frontend, product design, and cloud infrastructure by the rest of Group 1.

## Sustainable Development Goals

SpatialHunt supports **SDG 11** (Sustainable Cities and Communities) by making housing more accessible, secure, and transparent, and **SDG 8** (Decent Work and Economic Growth) by cutting back exploitative rental practices.