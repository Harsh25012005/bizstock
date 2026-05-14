import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { createDocument, FIREBASE_COLLECTIONS } from "@/firebase/firestore";
import {
  getCurrentUser,
  getFirebaseAuthInstance,
  isFirebaseReady,
  logout as firebaseLogout,
  sendOTP,
  subscribeToAuthChanges,
  verifyOTP as verifyPhoneOtp,
} from "@/firebase";
import { FirebaseFeatureError } from "@/firebase/errors";
import {
  mapFirebaseUserToProfile,
  mapFirebaseUserToSession,
  type BusinessDocument,
  type PendingOtpVerification,
} from "@/firebase/types";
import type { BusinessCategory } from "@/types";

export const signInWithEmail = async (payload: { email: string; password: string }) => {
  const auth = getFirebaseAuthInstance();
  const result = await signInWithEmailAndPassword(auth, payload.email.trim(), payload.password);

  return {
    session: mapFirebaseUserToSession(result.user),
    user: mapFirebaseUserToProfile(result.user),
  };
};

export const signUpWithEmail = async (payload: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}) => {
  const auth = getFirebaseAuthInstance();
  const result = await createUserWithEmailAndPassword(auth, payload.email.trim(), payload.password);

  await updateProfile(result.user, {
    displayName: payload.fullName.trim(),
  });

  await createDocument(
    FIREBASE_COLLECTIONS.users,
    {
      uid: result.user.uid,
      displayName: payload.fullName.trim(),
      phoneNumber: payload.phoneNumber,
      businessId: null,
      role: "owner",
      isActive: true,
    },
    result.user.uid,
  );

  return {
    session: mapFirebaseUserToSession(result.user),
    user: {
      ...mapFirebaseUserToProfile(result.user),
      displayName: payload.fullName.trim(),
      phoneNumber: payload.phoneNumber,
    },
  };
};

export const signInWithPhone = async (payload: { phoneNumber: string; appVerifier?: unknown }): Promise<PendingOtpVerification> => {
  const result = await sendOTP(payload);

  return {
    ...result,
    requestedAt: Date.now(),
    mode: result.verificationId === "bizstock-mock-verification" ? "mock" : "firebase",
  };
};

export const verifyOTP = async (verificationId: string, otp: string) => {
  return verifyPhoneOtp(verificationId, otp);
};

export const forgotPassword = async (email: string) => {
  if (!isFirebaseReady()) {
    if (__DEV__) {
      return;
    }

    throw new FirebaseFeatureError("Firebase email reset is not configured yet.");
  }

  await sendPasswordResetEmail(getFirebaseAuthInstance(), email.trim());
};

export const signInWithGoogle = async () => {
  throw new FirebaseFeatureError(
    "Google Sign-In UI is ready, but native Google provider wiring still needs Expo/Google auth setup.",
  );
};

export const createBusinessProfile = async (payload: {
  businessName: string;
  ownerName: string;
  gstNumber?: string;
  businessAddress: string;
  category: BusinessCategory;
}) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new FirebaseFeatureError("Sign in before creating a business profile.");
  }

  return createDocument(FIREBASE_COLLECTIONS.businesses, {
    name: payload.businessName.trim(),
    ownerId: currentUser.uid,
    ownerName: payload.ownerName.trim(),
    phoneNumber: currentUser.phoneNumber ?? undefined,
    gstNumber: payload.gstNumber?.trim() || undefined,
    address: payload.businessAddress.trim(),
    category: payload.category,
  } satisfies Omit<BusinessDocument, "id" | "createdAt" | "updatedAt">);
};

export const subscribeToSessionChanges = subscribeToAuthChanges;

export const getCurrentSession = () => {
  const user = getCurrentUser();
  return user ? mapFirebaseUserToSession(user) : null;
};

export const logout = async () => {
  await firebaseLogout();
};
