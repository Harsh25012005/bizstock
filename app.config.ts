import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "BizStock",
  slug: "bizstock",
  scheme: "bizstock",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  experiments: {
    typedRoutes: true,
  },
  splash: {
    resizeMode: "contain",
    backgroundColor: "#F6F7FB",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.bizstock.app",
  },
  android: {
    package: "com.bizstock.app",
    googleServicesFile: "./google-services.json",
  },
  web: {
    bundler: "metro",
    output: "single",
  },
  plugins: ["expo-router", "expo-secure-store"],
  extra: {
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? "development",
    firebase: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? "",
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? "",
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? "",
      functionsRegion: process.env.EXPO_PUBLIC_FIREBASE_FUNCTIONS_REGION ?? "asia-south1",
    },
  },
};

export default config;
