import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

import { firebaseConfig } from "@/config/firebase";
import { isFirebaseConfigured } from "@/config/env";
import { logger } from "@/utils";

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;
let cachedDb: Firestore | null = null;
let hasWarnedAboutMissingFirebase = false;

export const getFirebaseApp = () => {
  if (cachedApp) {
    return cachedApp;
  }

  if (!isFirebaseConfigured) {
    if (!hasWarnedAboutMissingFirebase) {
      logger.warn("Firebase environment variables are incomplete. Firebase services will stay disabled.");
      hasWarnedAboutMissingFirebase = true;
    }
    return null;
  }

  cachedApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

  return cachedApp;
};

export const getFirebaseAuth = () => {
  if (cachedAuth) {
    return cachedAuth;
  }

  const app = getFirebaseApp();
  if (!app) {
    return null;
  }

  cachedAuth = getAuth(app);
  return cachedAuth;
};

export const getFirebaseDb = () => {
  if (cachedDb) {
    return cachedDb;
  }

  const app = getFirebaseApp();
  if (!app) {
    return null;
  }

  cachedDb = getFirestore(app);
  return cachedDb;
};

export const firebaseApp = getFirebaseApp();
export const firebaseAuth = getFirebaseAuth();
export const firebaseDb = getFirebaseDb();
