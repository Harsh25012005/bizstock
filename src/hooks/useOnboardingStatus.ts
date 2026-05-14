import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import { STORAGE_KEYS } from "@/constants";
import { useAppStore } from "@/store";

const ONBOARDING_COMPLETED_VALUE = "true";

export const useOnboardingStatus = () => {
  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding);
  const setHasSeenOnboarding = useAppStore((state) => state.setHasSeenOnboarding);
  const appHydrated = useAppStore((state) => state.hasHydrated);
  const [isCheckingAsyncStorage, setIsCheckingAsyncStorage] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncFromAsyncStorage = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(STORAGE_KEYS.onboarding);

        if (isMounted && storedValue === ONBOARDING_COMPLETED_VALUE && !hasSeenOnboarding) {
          setHasSeenOnboarding(true);
        }
      } finally {
        if (isMounted) {
          setIsCheckingAsyncStorage(false);
        }
      }
    };

    void syncFromAsyncStorage();

    return () => {
      isMounted = false;
    };
  }, [hasSeenOnboarding, setHasSeenOnboarding]);

  const completeOnboarding = useCallback(async () => {
    setHasSeenOnboarding(true);
    await AsyncStorage.setItem(STORAGE_KEYS.onboarding, ONBOARDING_COMPLETED_VALUE);
  }, [setHasSeenOnboarding]);

  return {
    hasSeenOnboarding,
    completeOnboarding,
    isReady: appHydrated && !isCheckingAsyncStorage,
  };
};
