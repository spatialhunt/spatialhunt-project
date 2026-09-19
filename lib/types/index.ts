/**
 * Shared domain types for SpatialHunt frontend.
 * Align with prisma/schema.prisma and Mongo message schemas.
 * Do not invent fields that contradict the backend.
 */

export type Role = "TENANT" | "LANDLORD" | "ADMIN" | "HUNTER";

export type PropertyType = "SINGLE_ROOM" | "APARTMENT" | "HOUSE";

export type PropertyStatus =
  | "DRAFT"
  | "PENDING_VERIFICATION"
  | "VERIFIED"
  | "REJECTED"
  | "RENTED";

export type VerificationType = "LANDLORD_ID" | "PROPERTY_WALKTHROUGH";

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type BookingStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "DECLINED"
  | "RESCHEDULED"
  | "COMPLETED";

export type EscrowStatus =
  | "PENDING"
  | "FUNDED"
  | "INSPECTION_CONFIRMED"
  | "KEYS_RECEIVED"
  | "AGREEMENT_SIGNED"
  | "RELEASED"
  | "REFUNDED"
  | "DISPUTED";

export type FurnishingType = "UNFURNISHED" | "SEMI_FURNISHED" | "FURNISHED";
export type PricePeriod = "MONTHLY" | "YEARLY";
export type ListingIntent = "RENT" | "SALE";

export interface AuthSession {
  accessToken: string;
  userId: string;
  email: string;
  role: Role;
  fullName?: string;
}

export interface UserSummary {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  role: Role;
  isVerified?: boolean;
}

export interface PropertyPhoto {
  id: string;
  propertyId: string;
  url: string;
  isWalkthroughVideo: boolean;
  order: number;
}

export interface Property {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  price: number | string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  state: string;
  latitude?: number | null;
  longitude?: number | null;
  amenities: string[];
  status: PropertyStatus;
  furnishing?: FurnishingType;
  pricePeriod?: PricePeriod;
  listingIntent?: ListingIntent;
  photos?: PropertyPhoto[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Verification {
  id: string;
  userId: string;
  propertyId?: string | null;
  type: VerificationType;
  status: VerificationStatus;
  documentUrl: string;
  reviewNotes?: string | null;
  createdAt: string;
  reviewedAt?: string | null;
}

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  scheduledAt: string;
  status: BookingStatus;
  property?: Partial<Property>;
  createdAt?: string;
  updatedAt?: string;
}

export interface EscrowTransaction {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  amount: number | string;
  status: EscrowStatus;
  paystackReference?: string | null;
  fundedAt?: string | null;
  inspectionConfirmedAt?: string | null;
  keysReceivedAt?: string | null;
  agreementSignedAt?: string | null;
  releasedAt?: string | null;
  createdAt?: string;
  property?: Partial<Property>;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: string;
  message: string;
  relatedId?: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  createdAt?: string;
  updatedAt?: string;
  lastMessage?: string;
  unreadCount?: number;
  propertyTitle?: string;
  counterpartName?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType | "";
  bedrooms?: number;
  amenities?: string[];
  alertsEnabled: boolean;
  matchCount?: number;
  updatedAt: string;
}

export interface Dispute {
  id: string;
  category: string;
  claimantId: string;
  respondentId: string;
  propertyId?: string;
  transactionId?: string;
  status: "OPEN" | "UNDER_REVIEW" | "AWAITING_RESPONSE" | "RESOLVED" | "ESCALATED" | "CLOSED";
  summary: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

// ─── Hunter types ─────────────────────────────────────────────────────────────

export type HunterStatus = "PENDING" | "ACTIVE" | "SUSPENDED";
export type HunterTier = "STARTER" | "PRO" | "ELITE";
export type HunterMatchStatus = "PENDING" | "CONNECTED" | "LEASE_SIGNED" | "COMMISSION_PAID" | "CANCELLED";

export interface HunterProfile {
  id: string;
  userId: string;
  status: HunterStatus;
  tier: HunterTier;
  commissionRate: number; // percentage e.g. 5 = 5%
  totalEarnings: number;
  pendingEarnings: number;
  successfulMatches: number;
  activeLeads: number;
  joinedAt: string;
  bio?: string;
  coverageAreas: string[]; // e.g. ["Lekki", "Yaba"]
}

export interface HunterMatch {
  id: string;
  hunterId: string;
  tenantId: string;
  propertyId: string;
  status: HunterMatchStatus;
  commissionAmount?: number;
  tenantName?: string;
  propertyTitle?: string;
  propertyCity?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface HunterLead {
  id: string;
  hunterId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone?: string;
  budget: number;
  location: string;
  propertyType?: PropertyType;
  bedrooms?: number;
  notes?: string;
  status: "NEW" | "CONTACTED" | "VIEWING_SCHEDULED" | "OFFER_MADE" | "CONVERTED" | "LOST";
  createdAt: string;
}
