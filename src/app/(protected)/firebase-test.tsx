import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import { Button, Input, PlaceholderCard, ScreenWrapper, Text } from "@/components";
import {
  FIREBASE_COLLECTIONS,
  createDocument,
  deleteDocument,
  getCollection,
  getDocument,
  updateDocument,
} from "@/firebase";
import { getFirebaseErrorMessage } from "@/firebase/errors";

export default function FirebaseTestScreen() {
  const [businessId, setBusinessId] = useState("demo-business");
  const [productName, setProductName] = useState("Atta 10kg");
  const [lastCreatedId, setLastCreatedId] = useState("");
  const [result, setResult] = useState<string>("Run any action below to test Firestore helpers.");
  const [isLoading, setIsLoading] = useState(false);

  const examplePayload = useMemo(
    () => ({
      businessId,
      name: productName,
      sku: `SKU-${Date.now().toString().slice(-6)}`,
      unit: "bag",
      price: 565,
      stock: 180,
      category: "Staples",
      isActive: true,
    }),
    [businessId, productName],
  );

  const runAsync = async (task: () => Promise<void>) => {
    setIsLoading(true);

    try {
      await task();
    } catch (error) {
      setResult(`Error: ${getFirebaseErrorMessage(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper
      title="Firestore test"
      subtitle="Exercise the reusable Firestore helpers against BizStock example collections."
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <PlaceholderCard title="Collection helper test" subtitle="Products collection example">
            <View className="gap-4">
              <Input label="Business ID" value={businessId} onChangeText={setBusinessId} />
              <Input label="Product name" value={productName} onChangeText={setProductName} />
              <Button
                label="Create document"
                isLoading={isLoading}
                onPress={() =>
                  runAsync(async () => {
                    const id = await createDocument(FIREBASE_COLLECTIONS.products, examplePayload);
                    setLastCreatedId(id ?? "");
                    setResult(`Created product document: ${id}`);
                  })
                }
              />
              <Button
                label="Fetch collection"
                variant="secondary"
                isLoading={isLoading}
                onPress={() =>
                  runAsync(async () => {
                    const products = await getCollection(FIREBASE_COLLECTIONS.products, [], { limitCount: 5 });
                    setResult(JSON.stringify(products, null, 2));
                  })
                }
              />
              <Button
                label="Fetch last created document"
                variant="outline"
                isLoading={isLoading}
                disabled={!lastCreatedId}
                onPress={() =>
                  runAsync(async () => {
                    const product = await getDocument(FIREBASE_COLLECTIONS.products, lastCreatedId);
                    setResult(JSON.stringify(product, null, 2));
                  })
                }
              />
              <Button
                label="Update last created document"
                variant="ghost"
                isLoading={isLoading}
                disabled={!lastCreatedId}
                onPress={() =>
                  runAsync(async () => {
                    await updateDocument(FIREBASE_COLLECTIONS.products, lastCreatedId, {
                      stock: 225,
                    });
                    setResult(`Updated stock for ${lastCreatedId}`);
                  })
                }
              />
              <Button
                label="Delete last created document"
                variant="danger"
                isLoading={isLoading}
                disabled={!lastCreatedId}
                onPress={() =>
                  runAsync(async () => {
                    await deleteDocument(FIREBASE_COLLECTIONS.products, lastCreatedId);
                    setResult(`Deleted document ${lastCreatedId}`);
                    setLastCreatedId("");
                  })
                }
              />
            </View>
          </PlaceholderCard>

          <PlaceholderCard title="Result log" subtitle="Backend responses appear here">
            <Text selectable className="text-sm leading-6 text-ink-700">
              {result}
            </Text>
          </PlaceholderCard>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
