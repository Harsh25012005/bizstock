import type { User } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

export const FIREBASE_COLLECTIONS = {
  users: "users",
  businesses: "businesses",
  products: "products",
  retailers: "retailers",
  orders: "orders",
  payments: "payments",
} as const;

export type FirebaseCollectionName = (typeof FIREBASE_COLLECTIONS)[keyof typeof FIREBASE_COLLECTIONS];

export interface FirebaseDocument {
  id: string;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface FirebaseUserProfile extends FirebaseDocument {
  uid: string;
  phoneNumber?: string | null;
  displayName?: string | null;
  businessId?: string | null;
  role?: "owner" | "manager" | "staff";
  isActive: boolean;
}

export interface BusinessDocument extends FirebaseDocument {
  name: string;
  ownerId: string;
  phoneNumber?: string;
  gstNumber?: string;
  address?: string;
}

export interface ProductDocument extends FirebaseDocument {
  businessId: string;
  name: string;
  sku: string;
  unit: string;
  price: number;
  stock: number;
  category?: string;
  isActive: boolean;
}

export interface RetailerDocument extends FirebaseDocument {
  businessId: string;
  name: string;
  phoneNumber: string;
  area?: string;
  creditLimit?: number;
  outstandingAmount?: number;
}

export interface OrderDocument extends FirebaseDocument {
  businessId: string;
  retailerId: string;
  totalAmount: number;
  status: "draft" | "confirmed" | "fulfilled" | "cancelled";
  itemCount: number;
}

export interface PaymentDocument extends FirebaseDocument {
  businessId: string;
  retailerId: string;
  amount: number;
  mode: "cash" | "upi" | "bank_transfer" | "cheque";
  status: "pending" | "settled" | "failed";
  orderId?: string;
}

export interface FirebaseAuthSession {
  userId: string;
  phoneNumber?: string | null;
  displayName?: string | null;
  isFirebaseBacked: boolean;
}

export interface PendingOtpVerification {
  phoneNumber: string;
  verificationId: string;
  requestedAt: number;
  mode: "firebase" | "mock";
}

export interface FirebaseAuthUser {
  uid: string;
  phoneNumber?: string | null;
  displayName?: string | null;
  email?: string | null;
}

export interface SendOtpOptions {
  phoneNumber: string;
  appVerifier?: unknown;
}

export interface SendOtpResult {
  phoneNumber: string;
  verificationId: string;
}

export interface CollectionQueryOptions {
  limitCount?: number;
}

export interface FirestoreCollectionMap {
  users: FirebaseUserProfile;
  businesses: BusinessDocument;
  products: ProductDocument;
  retailers: RetailerDocument;
  orders: OrderDocument;
  payments: PaymentDocument;
}

export const mapFirebaseUserToSession = (user: User): FirebaseAuthSession => ({
  userId: user.uid,
  phoneNumber: user.phoneNumber,
  displayName: user.displayName,
  isFirebaseBacked: true,
});

export const mapFirebaseUserToProfile = (user: User): FirebaseAuthUser => ({
  uid: user.uid,
  phoneNumber: user.phoneNumber,
  displayName: user.displayName,
  email: user.email,
});
