import type {
  Property,
  SavedSearch,
  Booking,
  EscrowTransaction,
  Conversation,
  NotificationItem,
  UserSummary,
  Verification,
  Dispute,
  AuditLogEntry,
} from "@/lib/types";

/**
 * Centralized demo data for UI development when APIs are unreachable.
 * Clearly labeled — replace by wiring services to live backends.
 */

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "mock-lekki-2bed",
    ownerId: "landlord-1",
    title: "2 Bedroom Apartment",
    description: "Secure estate apartment with reliable power and treated water in Lekki Phase 1.",
    price: 2500000,
    type: "APARTMENT",
    bedrooms: 2,
    bathrooms: 2,
    address: "12 Admiralty Way",
    city: "Lagos",
    state: "Lagos",
    amenities: ["Water", "Power backup", "Security", "Parking"],
    status: "VERIFIED",
    pricePeriod: "YEARLY",
    photos: [{ id: "p1", propertyId: "mock-lekki-2bed", url: "/property1.svg", isWalkthroughVideo: false, order: 0 }],
  },
  {
    id: "mock-yaba-mini",
    ownerId: "landlord-2",
    title: "Mini Flat near UNILAG",
    description: "Compact mini flat ideal for students — walkable to campus shuttle.",
    price: 900000,
    type: "APARTMENT",
    bedrooms: 1,
    bathrooms: 1,
    address: "45 Herbert Macaulay",
    city: "Lagos",
    state: "Lagos",
    amenities: ["Water", "Security", "Road access"],
    status: "VERIFIED",
    pricePeriod: "YEARLY",
    photos: [{ id: "p2", propertyId: "mock-yaba-mini", url: "/miniflat.svg", isWalkthroughVideo: false, order: 0 }],
  },
  {
    id: "mock-ikeja-3bed",
    ownerId: "landlord-1",
    title: "3 Bedroom Duplex",
    description: "Family duplex with parking and estate security in Ikeja GRA.",
    price: 4500000,
    type: "HOUSE",
    bedrooms: 3,
    bathrooms: 3,
    address: "8 Oduduwa Crescent",
    city: "Lagos",
    state: "Lagos",
    amenities: ["Water", "Power backup", "Security", "Parking", "Kitchen"],
    status: "PENDING_VERIFICATION",
    pricePeriod: "YEARLY",
    photos: [{ id: "p3", propertyId: "mock-ikeja-3bed", url: "/property2.svg", isWalkthroughVideo: false, order: 0 }],
  },
];

export const MOCK_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: "ss-1",
    name: "Lekki under ₦3m",
    location: "Lekki, Lagos",
    minPrice: 1000000,
    maxPrice: 3000000,
    propertyType: "APARTMENT",
    bedrooms: 2,
    amenities: ["Water", "Security"],
    alertsEnabled: true,
    matchCount: 12,
    updatedAt: "2026-09-10T10:00:00Z",
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "bk-1",
    propertyId: "mock-lekki-2bed",
    tenantId: "tenant-1",
    scheduledAt: "2026-09-18T10:00:00Z",
    status: "CONFIRMED",
    property: MOCK_PROPERTIES[0],
  },
];

export const MOCK_ESCROWS: EscrowTransaction[] = [
  {
    id: "esc-1",
    propertyId: "mock-lekki-2bed",
    tenantId: "tenant-1",
    landlordId: "landlord-1",
    amount: 2500000,
    status: "FUNDED",
    property: MOCK_PROPERTIES[0],
    fundedAt: "2026-09-12T12:00:00Z",
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    propertyId: "mock-lekki-2bed",
    tenantId: "tenant-1",
    landlordId: "landlord-1",
    lastMessage: "Inspection confirmed for Thursday 10am.",
    unreadCount: 1,
    propertyTitle: "2 Bedroom Apartment — Lekki",
    counterpartName: "Adewale O.",
    updatedAt: "2026-09-14T08:30:00Z",
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    userId: "tenant-1",
    type: "inspection",
    message: "Your inspection request was accepted for Thursday 10:00 AM.",
    isRead: false,
    createdAt: "2026-09-14T07:00:00Z",
    relatedId: "bk-1",
  },
  {
    id: "n2",
    userId: "tenant-1",
    type: "message",
    message: "Adewale O. replied about 2 Bedroom Apartment — Lekki.",
    isRead: false,
    createdAt: "2026-09-13T18:20:00Z",
    relatedId: "conv-1",
  },
];

export const MOCK_USERS: UserSummary[] = [
  { id: "tenant-1", email: "adewale@example.com", fullName: "Adewale O.", role: "TENANT", isVerified: true },
  { id: "landlord-1", email: "chioma@example.com", fullName: "Chioma N.", role: "LANDLORD", isVerified: true },
  { id: "landlord-2", email: "tunde@example.com", fullName: "Tunde A.", role: "LANDLORD", isVerified: false },
  { id: "admin-1", email: "ops@spatialhunt.com", fullName: "Ops Admin", role: "ADMIN", isVerified: true },
];

export const MOCK_VERIFICATIONS: Verification[] = [
  {
    id: "ver-1",
    userId: "landlord-1",
    propertyId: "mock-ikeja-3bed",
    type: "PROPERTY_WALKTHROUGH",
    status: "PENDING",
    documentUrl: "https://example.com/docs/authority.pdf",
    createdAt: "2026-09-12T09:00:00Z",
  },
  {
    id: "ver-2",
    userId: "landlord-2",
    type: "LANDLORD_ID",
    status: "REJECTED",
    documentUrl: "https://example.com/docs/id-scan.pdf",
    reviewNotes: "Document image is blurry. Please resubmit a clearer scan.",
    createdAt: "2026-09-10T14:00:00Z",
    reviewedAt: "2026-09-11T10:00:00Z",
  },
  {
    id: "ver-3",
    userId: "landlord-1",
    type: "LANDLORD_ID",
    status: "APPROVED",
    documentUrl: "https://example.com/docs/id-approved.pdf",
    createdAt: "2026-09-01T08:00:00Z",
    reviewedAt: "2026-09-02T11:00:00Z",
  },
];

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: "disp-1",
    category: "Escrow release",
    claimantId: "tenant-1",
    respondentId: "landlord-1",
    propertyId: "mock-lekki-2bed",
    transactionId: "esc-1",
    status: "OPEN",
    summary: "Tenant claims keys were not handed over as agreed.",
    createdAt: "2026-09-13T16:00:00Z",
  },
  {
    id: "disp-2",
    category: "Listing accuracy",
    claimantId: "tenant-1",
    respondentId: "landlord-2",
    propertyId: "mock-yaba-mini",
    status: "UNDER_REVIEW",
    summary: "Photos do not match current unit condition.",
    createdAt: "2026-09-11T09:30:00Z",
  },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    userId: "admin-1",
    action: "VERIFICATION_APPROVED",
    entityType: "Verification",
    entityId: "ver-3",
    createdAt: "2026-09-02T11:00:00Z",
  },
  {
    id: "log-2",
    userId: "admin-1",
    action: "USER_SUSPENDED",
    entityType: "User",
    entityId: "landlord-2",
    metadata: { reason: "Policy review" },
    createdAt: "2026-09-08T15:20:00Z",
  },
  {
    id: "log-3",
    action: "PROPERTY_SUBMITTED",
    entityType: "Property",
    entityId: "mock-ikeja-3bed",
    userId: "landlord-1",
    createdAt: "2026-09-12T09:00:00Z",
  },
];

export function maskNin(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4) return "****";
  return `****${digits.slice(-4)}`;
}

export function formatNaira(amount: number | string): string {
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (Number.isNaN(n)) return "₦—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
}
