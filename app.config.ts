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
  },
  web: {
    bundler: "metro",
    output: "single",
  },
  plugins: ["expo-router", "expo-secure-store"],
  extra: {
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? "development",
  },
};

export default config;
