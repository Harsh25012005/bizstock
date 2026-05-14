import { logger } from "@/utils";

export class FirebaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FirebaseConfigError";
  }
}

export class FirebaseFeatureError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FirebaseFeatureError";
  }
}

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-app-credential":
    "Phone authentication requires a valid app verifier. Connect your reCAPTCHA or native verifier first.",
  "auth/invalid-verification-code": "The OTP is invalid. Please check the code and try again.",
  "auth/code-expired": "The OTP has expired. Request a fresh code and try again.",
  "auth/too-many-requests": "Too many requests were made. Please wait a moment and try again.",
  "auth/missing-phone-number": "Enter a valid phone number to continue.",
  "permission-denied": "You do not have permission to access this data.",
  unavailable: "The network is unavailable right now. Your action can be retried shortly.",
};

export const getFirebaseErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseConfigError || error instanceof FirebaseFeatureError) {
    return error.message;
  }

  if (typeof error === "object" && error && "code" in error && typeof error.code === "string") {
    return FIREBASE_ERROR_MESSAGES[error.code] ?? error.code;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong while talking to Firebase.";
};

export const handleFirebaseError = (scope: string, error: unknown): never => {
  logger.error(scope, error);
  throw new Error(getFirebaseErrorMessage(error));
};
