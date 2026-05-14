const getEnv = (key: string, fallback = "") => {
  const value = process.env[key];
  return typeof value === "string" ? value : fallback;
};

export const env = {
  appEnv: getEnv("EXPO_PUBLIC_APP_ENV", "development"),
  firebaseApiKey: getEnv("EXPO_PUBLIC_FIREBASE_API_KEY"),
  firebaseAuthDomain: getEnv("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  firebaseProjectId: getEnv("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  firebaseStorageBucket: getEnv("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  firebaseMessagingSenderId: getEnv("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  firebaseAppId: getEnv("EXPO_PUBLIC_FIREBASE_APP_ID"),
};

export const isFirebaseConfigured = Boolean(
  env.firebaseApiKey &&
    env.firebaseAuthDomain &&
    env.firebaseProjectId &&
    env.firebaseStorageBucket &&
    env.firebaseMessagingSenderId &&
    env.firebaseAppId,
);
