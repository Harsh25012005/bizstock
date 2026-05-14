import {
  onboardingInventoryIllustration,
  onboardingOperationsIllustration,
  onboardingRetailersIllustration,
} from "@/constants/assets";

export interface OnboardingSlide {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  supportLabel: string;
  ctaLabel: string;
  illustration: number;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "inventory",
    eyebrow: "Inventory Control",
    title: "Manage Inventory Smartly",
    subtitle: "Track stock and get low inventory alerts instantly.",
    supportLabel: "Reduce stockouts and over-ordering with clearer inventory visibility.",
    ctaLabel: "Next",
    illustration: onboardingInventoryIllustration,
  },
  {
    id: "operations",
    eyebrow: "Daily Operations",
    title: "Run Your Business Faster",
    subtitle: "Manage orders, payments, and daily operations from one app.",
    supportLabel: "Keep sales, collections, and dispatch activity aligned in one workflow.",
    ctaLabel: "Continue",
    illustration: onboardingOperationsIllustration,
  },
  {
    id: "retailers",
    eyebrow: "Retailer Relations",
    title: "Manage Retailers Better",
    subtitle: "Track retailer orders, dues, and communication easily.",
    supportLabel: "Stay on top of follow-ups, dues, and repeat ordering without extra paperwork.",
    ctaLabel: "Start Managing Business",
    illustration: onboardingRetailersIllustration,
  },
];
