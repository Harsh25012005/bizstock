import PagerView, { PagerViewOnPageScrollEvent, PagerViewOnPageSelectedEvent } from "react-native-pager-view";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { OnboardingButton, OnboardingCard, PaginationDots } from "@/components/onboarding";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { AUTH_HOME_ROUTE, ONBOARDING_SLIDES } from "@/constants";
import { useOnboardingStatus, useTheme } from "@/hooks";

export default function OnboardingScreen() {
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const insets = useSafeAreaInsets();
  const { colors, isDark, radius } = useTheme();
  const { completeOnboarding, isReady } = useOnboardingStatus();
  const progress = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentTranslateY = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = ONBOARDING_SLIDES[activeIndex];
  const isLastSlide = activeIndex === ONBOARDING_SLIDES.length - 1;

  const handlePageScroll = useCallback(
    (event: PagerViewOnPageScrollEvent) => {
      progress.setValue(event.nativeEvent.position + event.nativeEvent.offset);
    },
    [progress],
  );

  const handlePageSelected = useCallback(
    (event: PagerViewOnPageSelectedEvent) => {
      const nextIndex = event.nativeEvent.position;
      setActiveIndex(nextIndex);
      progress.setValue(nextIndex);
      contentOpacity.setValue(0);
      contentTranslateY.setValue(14);
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    },
    [contentOpacity, contentTranslateY, progress],
  );

  const finishOnboarding = useCallback(async () => {
    await completeOnboarding();
    router.replace(AUTH_HOME_ROUTE);
  }, [completeOnboarding, router]);

  const handlePrimaryAction = useCallback(async () => {
    if (isLastSlide) {
      await finishOnboarding();
      return;
    }

    pagerRef.current?.setPage(activeIndex + 1);
  }, [activeIndex, finishOnboarding, isLastSlide]);

  const pageViews = useMemo(
    () =>
      ONBOARDING_SLIDES.map((slide, index) => (
        <View key={slide.id} className="flex-1">
          <OnboardingCard illustration={slide.illustration} progress={progress} index={index} />
        </View>
      )),
    [progress],
  );

  if (!isReady) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center">
          <View style={{ width: 18, height: 18, borderRadius: 999, backgroundColor: colors.primary }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1">
        <View className="flex-row justify-end px-6 pb-1 pt-2">
          <Pressable
            onPress={() => void finishOnboarding()}
            hitSlop={12}
            style={{
              borderRadius: radius.full,
              paddingHorizontal: 10,
              paddingVertical: 6,
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "transparent",
            }}
          >
            <Text size="sm" weight="semibold" style={{ color: colors.primary }}>
              Skip
            </Text>
          </Pressable>
        </View>

        <View className="flex-1 justify-center">
          <PagerView
            ref={pagerRef}
            style={{ flex: 1 }}
            initialPage={0}
            onPageScroll={handlePageScroll}
            onPageSelected={handlePageSelected}
          >
            {pageViews}
          </PagerView>
        </View>

        <View
          className="px-6"
          style={{
            paddingBottom: Math.max(insets.bottom, 18),
          }}
        >
          <Animated.View
            className="items-center"
            style={{
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
            }}
          >
            <Heading
              level={2}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.82}
              style={{
                textAlign: "center",
                width: "100%",
                maxWidth: 340,
                lineHeight: 34,
              }}
            >
              {activeSlide.title}
            </Heading>

            <Text
              className="mt-4"
              size="base"
              weight="medium"
              tone="secondary"
              style={{
                textAlign: "center",
                maxWidth: 270,
                lineHeight: 22,
              }}
            >
              {activeSlide.subtitle}
            </Text>
          </Animated.View>

          <View className="mt-7 items-center">
            <PaginationDots count={ONBOARDING_SLIDES.length} progress={progress} />
          </View>

          <View
            className="mt-7"
            style={{
              shadowColor: colors.primary,
              shadowOpacity: isDark ? 0.16 : 0.1,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 2,
            }}
          >
            <OnboardingButton label={activeSlide.ctaLabel} onPress={() => void handlePrimaryAction()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
