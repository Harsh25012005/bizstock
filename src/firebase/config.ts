import { Platform } from "react-native";

import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  Firestore,
  initializeFirestore,
  memoryLocalCache,
  persistentLocalCache,
  persistentSingleTabManager,
} from "firebase/firestore";
import { Functions, getFunctions } from "firebase/functions";
import { FirebaseStorage, getStorage } from "firebase/storage";

import { env, isFirebaseConfigured } from "@/config/env";
import { FirebaseConfigError } from "@/firebase/errors";
import { logger } from "@/utils";

export const firebaseConfig = {
  apiKey: env.firebaseApiKey,
  authDomain: env.firebaseAuthDomain,
  projectId: env.firebaseProjectId,
  storageBucket: env.firebaseStorageBucket,
  messagingSenderId: env.firebaseMessagingSenderId,
  appId: env.firebaseAppId,
};

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;
let cachedFirestore: Firestore | null = null;
let cachedStorage: FirebaseStorage | null = null;
let cachedFunctions: Functions | null = null;
let hasWarnedAboutMissingFirebase = false;

export const isFirebaseReady = () => isFirebaseConfigured;

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

  cachedApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return cachedApp;
};

export const requireFirebaseApp = () => {
  const app = getFirebaseApp();
  if (!app) {
    throw new FirebaseConfigError("Firebase is not configured. Add your .env values before using backend services.");
  }

  return app;
};

export const getFirebaseAuthInstance = () => {
  if (cachedAuth) {
    return cachedAuth;
  }

  const app = requireFirebaseApp();

  // Auth state persistence is mirrored into the Zustand store and MMKV layer.
  // If you add AsyncStorage later, this function can be upgraded to initializeAuth(...getReactNativePersistence()).
  cachedAuth = getAuth(app);

  return cachedAuth;
};

export const getFirebaseFirestore = () => {
  if (cachedFirestore) {
    return cachedFirestore;
  }

  const app = requireFirebaseApp();

  try {
    cachedFirestore =
      Platform.OS === "web"
        ? initializeFirestore(app, {
            localCache: persistentLocalCache({
              tabManager: persistentSingleTabManager(undefined),
            }),
          })
        : initializeFirestore(app, {
            // The Firebase Web SDK does not provide IndexedDB persistence on native RN.
            // We keep memory cache here and pair it with BizStock's offline queue/persisted state.
            localCache: memoryLocalCache(),
            experimentalAutoDetectLongPolling: true,
          });
  } catch {
    cachedFirestore = initializeFirestore(app, {
      localCache: memoryLocalCache(),
      experimentalAutoDetectLongPolling: Platform.OS !== "web",
    });
  }

  return cachedFirestore;
};

export const getFirebaseStorageInstance = () => {
  if (cachedStorage) {
    return cachedStorage;
  }

  cachedStorage = getStorage(requireFirebaseApp());
  return cachedStorage;
};

export const getFirebaseFunctionsInstance = () => {
  if (cachedFunctions) {
    return cachedFunctions;
  }

  cachedFunctions = getFunctions(requireFirebaseApp(), env.firebaseFunctionsRegion);
  return cachedFunctions;
};
