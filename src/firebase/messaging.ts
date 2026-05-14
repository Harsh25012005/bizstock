import { Platform } from "react-native";

import { FirebaseFeatureError } from "@/firebase/errors";

export const registerForPushNotifications = async () => {
  const platformLabel = Platform.OS === "android" ? "FCM" : "APNs";

  throw new FirebaseFeatureError(
    `${platformLabel} support requires expo-notifications and a development build. Install and configure expo-notifications before using messaging helpers.`,
  );
};
