import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { AuthButton, AuthInput, BusinessCategoryCard } from "@/components/auth";
import { BUSINESS_CATEGORIES, PROTECTED_HOME_ROUTE } from "@/constants";
import { getFirebaseErrorMessage } from "@/firebase";
import { useToast } from "@/hooks";
import { businessProfileSchema, type BusinessProfileSchema } from "@/schemas";
import { useAuthStore } from "@/store";

import { AuthScreenLayout } from "./AuthScreenLayout";

export const AddBusinessScreen = () => {
  const router = useRouter();
  const { show } = useToast();
  const saveBusinessProfile = useAuthStore((state) => state.saveBusinessProfile);
  const isLoading = useAuthStore((state) => state.isLoading);

  const form = useForm<BusinessProfileSchema>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      gstNumber: "",
      businessAddress: "",
      category: undefined,
    },
  });

  const selectedCategory = form.watch("category");

  const submit = form.handleSubmit(async (values) => {
    try {
      await saveBusinessProfile(values);
      show({
        title: "Business added",
        description: "Your BizStock workspace is ready for operations.",
        variant: "success",
      });
      router.replace(PROTECTED_HOME_ROUTE);
    } catch (error) {
      show({
        title: "Unable to save business",
        description: getFirebaseErrorMessage(error),
        variant: "error",
      });
    }
  });

  return (
    <AuthScreenLayout
      title="Add your business"
      subtitle="We’ll use this information to prepare your inventory, retailer, and collection workspace."
    >
      <View className="gap-4">
        <Controller
          control={form.control}
          name="businessName"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              label="Business name"
              placeholder="Patel Distributors"
              value={value}
              onChangeText={onChange}
              error={form.formState.errors.businessName?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="ownerName"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              label="Owner name"
              placeholder="Rakesh Patel"
              value={value}
              onChangeText={onChange}
              error={form.formState.errors.ownerName?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="gstNumber"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              label="GST number (optional)"
              placeholder="27ABCDE1234F1Z5"
              value={value}
              onChangeText={onChange}
              autoCapitalize="characters"
            />
          )}
        />

        <Controller
          control={form.control}
          name="businessAddress"
          render={({ field: { onChange, value } }) => (
            <AuthInput
              label="Business address"
              placeholder="Enter full business address"
              value={value}
              onChangeText={onChange}
              multiline
              error={form.formState.errors.businessAddress?.message}
            />
          )}
        />

        <View className="gap-3">
          <View>
            <AuthInput
              label="Business category"
              value={selectedCategory ?? ""}
              editable={false}
              hint={form.formState.errors.category?.message ?? "Choose the closest business type"}
            />
          </View>
          <View className="flex-row flex-wrap gap-3">
            {BUSINESS_CATEGORIES.map((category) => (
              <View key={category} style={{ width: "48%" }}>
                <BusinessCategoryCard
                  category={category}
                  selected={selectedCategory === category}
                  onPress={(nextCategory) => form.setValue("category", nextCategory, { shouldValidate: true })}
                />
              </View>
            ))}
          </View>
        </View>

        <AuthButton label="Continue" onPress={() => void submit()} isLoading={isLoading} />
      </View>
    </AuthScreenLayout>
  );
};
