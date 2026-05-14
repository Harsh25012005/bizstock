import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";

import { FullScreenLoader } from "@/components";
import { AUTH_HOME_ROUTE } from "@/constants";
import { useAuthGuard, useTheme } from "@/hooks";

const TabLabel = ({ label, color }: { label: string; color: string }) => (
  <Text style={{ fontSize: 12, fontWeight: "500", color }}>{label}</Text>
);

export default function ProtectedLayout() {
  const { isAuthenticated, isReady } = useAuthGuard();
  const { colors } = useTheme();

  if (!isReady) {
    return <FullScreenLoader label="Checking protected session..." />;
  }

  if (!isAuthenticated) {
    return <Redirect href={AUTH_HOME_ROUTE} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          paddingBottom: 12,
          paddingTop: 10,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", tabBarLabel: ({ color }) => <TabLabel label="Dashboard" color={color} /> }}
      />
      <Tabs.Screen
        name="products"
        options={{ title: "Products", tabBarLabel: ({ color }) => <TabLabel label="Products" color={color} /> }}
      />
      <Tabs.Screen
        name="retailers"
        options={{ title: "Retailers", tabBarLabel: ({ color }) => <TabLabel label="Retailers" color={color} /> }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: "Orders", tabBarLabel: ({ color }) => <TabLabel label="Orders" color={color} /> }}
      />
      <Tabs.Screen
        name="payments"
        options={{ title: "Payments", tabBarLabel: ({ color }) => <TabLabel label="Payments" color={color} /> }}
      />
      <Tabs.Screen
        name="inventory"
        options={{ title: "Inventory", tabBarLabel: ({ color }) => <TabLabel label="Inventory" color={color} /> }}
      />
      <Tabs.Screen
        name="more"
        options={{ title: "More", tabBarLabel: ({ color }) => <TabLabel label="More" color={color} /> }}
      />
      <Tabs.Screen
        name="firebase-test"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
