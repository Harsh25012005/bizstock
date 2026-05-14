import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";

import { FullScreenLoader } from "@/components";
import { AUTH_HOME_ROUTE } from "@/constants";
import { useAuthGuard } from "@/hooks";

const TabLabel = ({ label }: { label: string }) => (
  <Text className="text-xs font-medium text-ink-500">{label}</Text>
);

export default function ProtectedLayout() {
  const { isAuthenticated, isReady } = useAuthGuard();

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
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", tabBarLabel: () => <TabLabel label="Dashboard" /> }}
      />
      <Tabs.Screen
        name="products"
        options={{ title: "Products", tabBarLabel: () => <TabLabel label="Products" /> }}
      />
      <Tabs.Screen
        name="retailers"
        options={{ title: "Retailers", tabBarLabel: () => <TabLabel label="Retailers" /> }}
      />
      <Tabs.Screen
        name="orders"
        options={{ title: "Orders", tabBarLabel: () => <TabLabel label="Orders" /> }}
      />
      <Tabs.Screen
        name="payments"
        options={{ title: "Payments", tabBarLabel: () => <TabLabel label="Payments" /> }}
      />
      <Tabs.Screen
        name="inventory"
        options={{ title: "Inventory", tabBarLabel: () => <TabLabel label="Inventory" /> }}
      />
      <Tabs.Screen
        name="more"
        options={{ title: "More", tabBarLabel: () => <TabLabel label="More" /> }}
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
