import Constants from "expo-constants";

type ExpoFirebaseExtra = {
  appEnv?: string;
  firebase?: {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    functionsRegion?: string;
  };
};

const expoExtra = (Constants.expoConfig?.extra ?? {}) as ExpoFirebaseExtra;

const getProcessEnv = (key: string, fallback = "") => {
  const value = process.env[key];
  return typeof value === "string" ? value : fallback;
};

const getConfigValue = (value: string | undefined, envKey: string, fallback = "") => {
  return typeof value === "string" && value.length > 0 ? value : getProcessEnv(envKey, fallback);
};

export const env = {
  appEnv: getConfigValue(expoExtra.appEnv, "EXPO_PUBLIC_APP_ENV", "development"),
  firebaseApiKey: getConfigValue(expoExtra.firebase?.apiKey, "EXPO_PUBLIC_FIREBASE_API_KEY"),
  firebaseAuthDomain: getConfigValue(expoExtra.firebase?.authDomain, "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  firebaseProjectId: getConfigValue(expoExtra.firebase?.projectId, "EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  firebaseStorageBucket: getConfigValue(expoExtra.firebase?.storageBucket, "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  firebaseMessagingSenderId: getConfigValue(
    expoExtra.firebase?.messagingSenderId,
    "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  ),
  firebaseAppId: getConfigValue(expoExtra.firebase?.appId, "EXPO_PUBLIC_FIREBASE_APP_ID"),
  firebaseFunctionsRegion: getConfigValue(
    expoExtra.firebase?.functionsRegion,
    "EXPO_PUBLIC_FIREBASE_FUNCTIONS_REGION",
    "asia-south1",
  ),
};

export const isFirebaseConfigured = Boolean(
  env.firebaseApiKey &&
    env.firebaseProjectId &&
    env.firebaseStorageBucket &&
    env.firebaseMessagingSenderId &&
    env.firebaseAppId,
);
