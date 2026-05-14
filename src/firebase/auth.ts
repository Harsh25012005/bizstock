import {
  type ApplicationVerifier,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirebaseAuthInstance, isFirebaseReady } from "@/firebase/config";
import { FirebaseFeatureError, handleFirebaseError } from "@/firebase/errors";
import {
  type FirebaseAuthUser,
  mapFirebaseUserToProfile,
  mapFirebaseUserToSession,
  type SendOtpOptions,
  type SendOtpResult,
} from "@/firebase/types";

const mockVerificationId = "bizstock-mock-verification";

// Phone auth flow:
// 1. The screen provides a phone number and an application verifier.
// 2. Firebase sends the OTP and returns a verification id.
// 3. OTP screen exchanges verification id + code for a signed-in Firebase user.
export const sendOTP = async ({ phoneNumber, appVerifier }: SendOtpOptions): Promise<SendOtpResult> => {
  if (!isFirebaseReady()) {
    if (__DEV__) {
      return {
        phoneNumber,
        verificationId: mockVerificationId,
      };
    }

    throw new FirebaseFeatureError("Firebase is not configured yet. Add your project keys to continue.");
  }

  if (!appVerifier) {
    throw new FirebaseFeatureError(
      "Phone authentication needs an application verifier. Supply your Expo reCAPTCHA/native verifier from the screen layer.",
    );
  }

  try {
    const auth = getFirebaseAuthInstance();
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier as ApplicationVerifier);

    return {
      phoneNumber,
      verificationId: confirmation.verificationId,
    };
  } catch (error) {
    handleFirebaseError("sendOTP", error);
    throw error;
  }
};

export const verifyOTP = async (verificationId: string, code: string) => {
  if (verificationId === mockVerificationId && __DEV__) {
    return {
      session: {
        userId: "mock-dev-user",
        phoneNumber: "+91 99999 99999",
        displayName: "BizStock Dev",
        isFirebaseBacked: false,
      },
      user: {
        uid: "mock-dev-user",
        phoneNumber: "+91 99999 99999",
        displayName: "BizStock Dev",
      } satisfies FirebaseAuthUser,
    };
  }

  try {
    const auth = getFirebaseAuthInstance();
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const result = await signInWithCredential(auth, credential);

    return {
      session: mapFirebaseUserToSession(result.user),
      user: mapFirebaseUserToProfile(result.user),
    };
  } catch (error) {
    handleFirebaseError("verifyOTP", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    if (!isFirebaseReady()) {
      return;
    }

    await signOut(getFirebaseAuthInstance());
  } catch (error) {
    handleFirebaseError("logout", error);
  }
};

export const getCurrentUser = () => {
  if (!isFirebaseReady()) {
    return null;
  }

  return getFirebaseAuthInstance().currentUser;
};

export const subscribeToAuthChanges = (callback: (payload: {
  session: ReturnType<typeof mapFirebaseUserToSession> | null;
  user: FirebaseAuthUser | null;
}) => void) => {
  if (!isFirebaseReady()) {
    callback({ session: null, user: null });
    return () => undefined;
  }

  return onAuthStateChanged(getFirebaseAuthInstance(), (user) => {
    callback({
      session: user ? mapFirebaseUserToSession(user) : null,
      user: user ? mapFirebaseUserToProfile(user) : null,
    });
  });
};
