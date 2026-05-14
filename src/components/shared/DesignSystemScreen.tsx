import { ReactNode, useCallback, useMemo } from "react";
import {
  Platform,
  Pressable,
  SectionList,
  SectionListRenderItem,
  ToastAndroid,
  useWindowDimensions,
  View,
} from "react-native";

import { ShowcaseSection, ShowcaseSectionHeader } from "@/components/shared/ShowcaseSection";
import { ThemeModeSwitch } from "@/components/shared/ThemeModeSwitch";
import type { DesignSectionContent, ThemeColorKey } from "@/components/shared/design-system.types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Caption } from "@/components/ui/Caption";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { EmptyState } from "@/components/ui/EmptyState";
import { FAB } from "@/components/ui/FAB";
import { Heading } from "@/components/ui/Heading";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Loader, Skeleton, SkeletonCard } from "@/components/ui/loader";
import { Screen } from "@/components/ui/Screen";
import { SearchInput } from "@/components/ui/SearchInput";
import { StatCard } from "@/components/ui/StatCard";
import { Text } from "@/components/ui/Text";
import { TextArea } from "@/components/ui/TextArea";
import { useTheme } from "@/hooks";

type DesignSectionKey =
  | "typography"
  | "buttons"
  | "inputs"
  | "cards"
  | "badges"
  | "loaders"
  | "empty"
  | "spacing"
  | "colors"
  | "shape";

interface DesignSection {
  key: DesignSectionKey;
  title: string;
  data: DesignSectionContent[];
}

const sections: DesignSection[] = [
  { key: "typography", title: "Typography", data: [{ key: "typography" }] },
  { key: "buttons", title: "Buttons", data: [{ key: "buttons" }] },
  { key: "inputs", title: "Inputs", data: [{ key: "inputs" }] },
  { key: "cards", title: "Cards", data: [{ key: "cards" }] },
  { key: "badges", title: "Badges", data: [{ key: "badges" }] },
  { key: "loaders", title: "Loaders", data: [{ key: "loaders" }] },
  { key: "empty", title: "Empty States", data: [{ key: "empty" }] },
  { key: "spacing", title: "Spacing System", data: [{ key: "spacing" }] },
  { key: "colors", title: "Color Palette", data: [{ key: "colors" }] },
  { key: "shape", title: "Shadows & Radius", data: [{ key: "shape" }] },
];

const typographyTones = ["primary", "secondary", "success", "warning", "danger", "info"] as const;
const buttonVariants = ["primary", "secondary", "outline", "ghost", "danger", "success"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;
const badgeVariants = ["neutral", "success", "warning", "danger", "info"] as const;
const spacingKeys = [1, 2, 3, 4, 5, 6, 8, 10] as const;
const semanticColors: ThemeColorKey[] = [
  "primary",
  "success",
  "warning",
  "danger",
  "info",
  "surface",
  "background",
  "border",
];

const DemoIcon = ({ symbol, color, tone }: { symbol: string; color?: string; tone?: any }) => (
  <Text size="base" weight="bold" tone={tone} style={color ? { color } : undefined}>
    {symbol}
  </Text>
);

const Grid = ({
  items,
  columns,
}: {
  items: ReactNode[];
  columns: 1 | 2;
}) => {
  return (
    <View className="flex-row flex-wrap gap-3">
      {items.map((item, index) => (
        <View key={index} style={{ width: columns === 2 ? "48%" : "100%" }}>
          {item}
        </View>
      ))}
    </View>
  );
};

const ProductPreviewCard = () => (
  <Card elevated>
    <View className="gap-3">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-1">
          <Heading level={4}>Aashirvaad Atta 10kg</Heading>
          <Caption>SKU PRD-1082</Caption>
        </View>
        <Badge label="Fast moving" variant="success" />
      </View>
      <Text tone="secondary">A compact product card optimized for pricing, stock, and quick actions.</Text>
      <View className="flex-row justify-between">
        <Caption>Stock: 248 bags</Caption>
        <Caption>MRP: Rs 565</Caption>
      </View>
    </View>
  </Card>
);

const RetailerPreviewCard = () => (
  <Card elevated>
    <View className="gap-3">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-1">
          <Heading level={4}>Jain Kirana Store</Heading>
          <Caption>Ujjain, MP</Caption>
        </View>
        <Badge label="High priority" variant="warning" />
      </View>
      <Text tone="secondary">A retailer card can surface collections, last order activity, and routing context.</Text>
      <View className="flex-row justify-between">
        <Caption>Due: Rs 38,400</Caption>
        <Caption>Last order: Today</Caption>
      </View>
    </View>
  </Card>
);

export default function DesignSystemScreen() {
  const { colors, isDark, radius, shadows, spacing } = useTheme();
  const { width } = useWindowDimensions();
  const columns = width >= 768 ? 2 : 1;

  const handleColorPress = useCallback((value: string) => {
    if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(value);
      return;
    }

    if (Platform.OS === "android") {
      ToastAndroid.show("Long-press the color value to copy", ToastAndroid.SHORT);
    }
  }, []);

  const renderSectionBody = useCallback(
    (sectionKey: DesignSectionKey) => {
      switch (sectionKey) {
        case "typography":
          return (
            <ShowcaseSection
              title="Typography"
              description="Readable, dense, business-first typography with semantic tones and consistent scale."
            >
              <View className="gap-4">
                <View className="gap-2">
                  <Heading level={1}>Heading Level 1</Heading>
                  <Heading level={2}>Heading Level 2</Heading>
                  <Heading level={3}>Heading Level 3</Heading>
                  <Heading level={4}>Heading Level 4</Heading>
                </View>
                <Divider />
                <View className="gap-2">
                  <Text>Base body text for daily wholesale operations.</Text>
                  <Label>Field label and form metadata</Label>
                  <Caption>Compact caption for helper and status text</Caption>
                </View>
                <Divider />
                <View className="gap-2">
                  <Text weight="regular">Regular weight</Text>
                  <Text weight="medium">Medium weight</Text>
                  <Text weight="semibold">Semibold weight</Text>
                  <Text weight="bold">Bold weight</Text>
                </View>
                <Divider />
                <View className="flex-row flex-wrap gap-3">
                  {typographyTones.map((tone) => (
                    <Text key={tone} tone={tone} weight="semibold">
                      {tone}
                    </Text>
                  ))}
                </View>
              </View>
            </ShowcaseSection>
          );
        case "buttons":
          return (
            <ShowcaseSection
              title="Buttons"
              description="Action hierarchy, large touch targets, variant coverage, and loading-safe states."
            >
              <View className="gap-4">
                {buttonVariants.map((variant) => (
                  <View key={variant} className="gap-3">
                    <Label>{variant}</Label>
                    <View className="flex-row flex-wrap gap-3">
                      {buttonSizes.map((size) => (
                        <Button
                          key={`${variant}-${size}`}
                          label={`${variant} ${size}`}
                          variant={variant}
                          size={size}
                          fullWidth={false}
                          leftIcon={variant === "primary" ? <DemoIcon symbol="+" /> : undefined}
                        />
                      ))}
                    </View>
                  </View>
                ))}
                <Divider />
                <View className="gap-3">
                  <Label>States</Label>
                  <View className="flex-row flex-wrap gap-3">
                    <Button label="Normal" fullWidth={false} />
                    <Button label="Disabled" fullWidth={false} disabled />
                    <Button label="Loading" fullWidth={false} isLoading />
                  </View>
                </View>
                <Divider />
                <View className="gap-3">
                  <Label>Icon Buttons & FAB</Label>
                  <View className="flex-row items-center gap-3">
                    <IconButton icon={<DemoIcon symbol="+" />} variant="primary" />
                    <IconButton icon={<DemoIcon symbol="i" />} variant="secondary" />
                    <IconButton icon={<DemoIcon symbol=">" />} variant="ghost" />
                  </View>
                  <View
                    className="relative mt-2 h-24 overflow-hidden rounded-2xl border border-dashed"
                    style={{ borderColor: colors.border }}
                  >
                    <FAB icon={<DemoIcon symbol="+" />} label="Add New" />
                  </View>
                </View>
              </View>
            </ShowcaseSection>
          );
        case "inputs":
          return (
            <ShowcaseSection
              title="Inputs"
              description="Fast-entry fields for operational forms, search flows, and validation-heavy screens."
            >
              <View className="gap-4">
                <Input label="Default input" placeholder="Enter retailer name" hint="Helper text appears here" />
                <Input
                  label="Error input"
                  placeholder="Enter GST number"
                  error="This GST number is invalid"
                  value="27ABCDE1234"
                />
                <Input label="Disabled input" placeholder="Locked field" value="Warehouse Auto Value" editable={false} />
                <SearchInput label="Search input" placeholder="Search products, orders, retailers" />
                <TextArea
                  label="Text area"
                  placeholder="Add dispatch notes or delivery instructions"
                  hint="Long-form notes with comfortable spacing"
                />
              </View>
            </ShowcaseSection>
          );
        case "cards":
          return (
            <ShowcaseSection
              title="Cards"
              description="Premium admin dashboard surfaces for metrics, product snapshots, and retailer summaries."
            >
              <View className="gap-4">
                <Card>
                  <Heading level={4}>Default Card</Heading>
                  <Text className="mt-2" tone="secondary">
                    A general-purpose content surface with subtle borders and clean flat separation.
                  </Text>
                </Card>
                <Grid
                  columns={columns}
                  items={[
                    <StatCard label="Today Sales" value="Rs 1.42L" hint="21 invoices generated" tone="primary" />,
                    <StatCard label="Collections" value="Rs 48,200" hint="8 payments recorded" tone="success" />,
                  ]}
                />
                <Grid columns={columns} items={[<ProductPreviewCard />, <RetailerPreviewCard />]} />
              </View>
            </ShowcaseSection>
          );
        case "badges":
          return (
            <ShowcaseSection
              title="Badges"
              description="Small but clear status markers for orders, payments, stock, and routing states."
            >
              <View className="flex-row flex-wrap gap-3">
                {badgeVariants.map((variant) => (
                  <Badge key={variant} label={variant} variant={variant} />
                ))}
              </View>
            </ShowcaseSection>
          );
        case "loaders":
          return (
            <ShowcaseSection
              title="Loaders"
              description="Minimal, readable loading indicators with restrained motion and clear progress labels."
            >
              <View className="gap-4">
                <Loader inline label="Inline loader" />
                <View className="items-start">
                  <Loader />
                </View>
                <Card>
                  <View className="h-40 items-center justify-center">
                    <Loader fullScreen label="Fullscreen loader preview" />
                  </View>
                </Card>
                <SkeletonCard />
                <View className="gap-2">
                  <Skeleton width="42%" height={12} rounded="full" />
                  <Skeleton width="100%" height={16} />
                  <Skeleton width="68%" height={16} />
                </View>
              </View>
            </ShowcaseSection>
          );
        case "empty":
          return (
            <ShowcaseSection
              title="Empty States"
              description="Actionable no-data patterns that guide the user instead of leaving dead space."
            >
              <View className="gap-4">
                <EmptyState
                  title="No products yet"
                  description="Create your first product to start inventory movement and sales tracking."
                  actionLabel="Add product"
                  onActionPress={() => undefined}
                />
                <EmptyState
                  title="No orders today"
                  description="Orders from field staff and retailers will appear here when they are placed."
                />
                <EmptyState
                  title="No retailers found"
                  description="Try broader filters or create a new retailer profile."
                  actionLabel="Create retailer"
                  onActionPress={() => undefined}
                />
              </View>
            </ShowcaseSection>
          );
        case "spacing":
          return (
            <ShowcaseSection
              title="Spacing System"
              description="Visual token reference for layout rhythm, touch comfort, and component consistency."
            >
              <View className="gap-3">
                {spacingKeys.map((key) => (
                  <View key={key} className="flex-row items-center gap-3">
                    <View className="w-10">
                      <Text size="sm" tone="secondary">
                        {spacing[key]}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: spacing[key] * 4,
                        height: 12,
                        borderRadius: radius.full,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </View>
                ))}
              </View>
            </ShowcaseSection>
          );
        case "colors":
          return (
            <ShowcaseSection
              title="Color Palette"
              description="Semantic tokens for business UI usage. Tap for a hint, long-press the value to copy on device."
            >
              <Grid
                columns={columns}
                items={semanticColors.map((key) => (
                  <Card key={key}>
                    <Pressable onPress={() => handleColorPress(colors[key])}>
                      <View className="gap-3">
                        <View className="h-14 rounded-2xl" style={{ backgroundColor: colors[key] }} />
                        <View className="gap-1">
                          <Label>{key}</Label>
                          <Text selectable size="sm" tone="secondary">
                            {colors[key]}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </Card>
                ))}
              />
            </ShowcaseSection>
          );
        case "shape":
          return (
            <ShowcaseSection
              title="Shadows & Radius"
              description="Surface softness and elevation references for cards, overlays, and grouped controls."
            >
              <View className="gap-4">
                <Grid
                  columns={columns}
                  items={[
                    <View className="gap-3">
                      <Label>Radius Examples</Label>
                      <View className="flex-row flex-wrap gap-3">
                        {Object.entries(radius).map(([key, value]) => (
                          <View
                            key={key}
                            className="items-center justify-center border px-4 py-3"
                            style={{
                              minWidth: 84,
                              borderColor: colors.border,
                              borderRadius: value,
                            }}
                          >
                            <Caption>{key}</Caption>
                          </View>
                        ))}
                      </View>
                    </View>,
                    <View className="gap-3">
                      <Label>Shadow Levels</Label>
                      <View className="gap-3">
                        {(["none", "sm", "md"] as const).map((level) => (
                          <View
                            key={level}
                            className="border px-4 py-4"
                            style={{
                              backgroundColor: colors.card,
                              borderColor: colors.border,
                              borderRadius: radius.md,
                              ...shadows[level],
                            }}
                          >
                            <Text weight="semibold">{level}</Text>
                          </View>
                        ))}
                      </View>
                    </View>,
                  ]}
                />
              </View>
            </ShowcaseSection>
          );
        default:
          return null;
      }
    },
    [colors, columns, handleColorPress, radius, shadows, spacing],
  );

  const renderItem: SectionListRenderItem<DesignSectionContent, DesignSection> = useCallback(
    ({ section }) => <Container className="mb-4">{renderSectionBody(section.key)}</Container>,
    [renderSectionBody],
  );

  const listHeader = useMemo(
    () => (
      <Container className="pb-4 pt-2">
        <View className="gap-4">
          <View className="gap-2">
            <Caption tone="primary">BizStock Design System</Caption>
            <Heading level={1}>Reusable UI Showcase</Heading>
            <Text tone="secondary">
              A premium developer reference screen for testing themes, spacing, states, and component consistency.
            </Text>
          </View>
          <Card elevated>
            <View className="gap-4">
              <View className="flex-row flex-wrap items-center justify-between gap-3">
                <View className="gap-1">
                  <Label>Theme Mode</Label>
                  <Text size="sm" tone="secondary">
                    Current theme: {isDark ? "Dark" : "Light"}
                  </Text>
                </View>
                <ThemeModeSwitch />
              </View>
              <Divider />
              <Grid
                columns={columns}
                items={[
                  <StatCard label="Primary Brand" value="Orange" hint={colors.primary} tone="primary" />,
                  <StatCard
                    label="Theme Status"
                    value={isDark ? "Dark UI" : "Light UI"}
                    hint="Semantic tokens active"
                    tone="info"
                  />,
                ]}
              />
            </View>
          </Card>
        </View>
      </Container>
    ),
    [colors.primary, columns, isDark],
  );

  return (
    <Screen scrollable={false} contentClassName="px-0 py-0">
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled
        keyExtractor={(item, index) => `${item.key}-${index}`}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => <ShowcaseSectionHeader title={section.title} />}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Screen>
  );
}
