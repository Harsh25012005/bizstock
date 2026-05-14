# BizStock Foundation

Production-grade Expo SDK 54 mobile foundation for a scalable BizStock application.

## Install

```bash
npx create-expo-app@latest BizStock -t expo-template-blank-typescript
cd BizStock
npx expo install expo-router expo-secure-store react-native-reanimated react-native-safe-area-context react-native-screens react-native-gesture-handler @shopify/flash-list
npm install nativewind tailwindcss zustand firebase react-hook-form zod @hookform/resolvers react-native-mmkv @tanstack/react-query
```

## Notes

- `expo-router` should be installed through `npx expo install` so Expo selects the SDK 54-compatible version.
- `react-native-mmkv` requires a development build for native execution outside Expo Go.
- Firebase is initialized with environment variables from `.env`.
- The architecture is feature-first and offline-ready, but no business features are implemented yet.
