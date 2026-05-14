import {
  type DocumentData,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type QueryConstraint,
} from "firebase/firestore";

import { getFirebaseFirestore } from "@/firebase/config";
import { handleFirebaseError } from "@/firebase/errors";
import {
  FIREBASE_COLLECTIONS,
  type FirebaseCollectionName,
  type FirestoreCollectionMap,
  type CollectionQueryOptions,
} from "@/firebase/types";

type CollectionPayload<TName extends FirebaseCollectionName> = Omit<
  FirestoreCollectionMap[TName],
  "id" | "createdAt" | "updatedAt"
>;

const withMetadata = <T extends DocumentData>(payload: T, isCreate: boolean) => ({
  ...payload,
  updatedAt: serverTimestamp(),
  ...(isCreate ? { createdAt: serverTimestamp() } : {}),
});

const mapSnapshotData = <TName extends FirebaseCollectionName>(
  snapshot: { id: string; data: () => DocumentData },
) => {
  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<FirestoreCollectionMap[TName], "id">),
  } as FirestoreCollectionMap[TName];
};

// Collection structure:
// - users: staff/owners mapped to Firebase Auth users
// - businesses: wholesaler master profiles
// - products: inventory items with stock + pricing
// - retailers: customer ledger entities
// - orders/payments: transactional collections referenced by businessId and retailerId
export const createDocument = async <TName extends FirebaseCollectionName>(
  collectionName: TName,
  payload: CollectionPayload<TName>,
  documentId?: string,
): Promise<string> => {
  try {
    const db = getFirebaseFirestore();
    const documentRef = documentId
      ? doc(db, collectionName, documentId)
      : doc(collection(db, collectionName));

    await setDoc(documentRef, withMetadata(payload, true));

    return documentRef.id;
  } catch (error) {
    handleFirebaseError(`createDocument:${collectionName}`, error);
    throw error;
  }
};

export const updateDocument = async <TName extends FirebaseCollectionName>(
  collectionName: TName,
  documentId: string,
  payload: Partial<CollectionPayload<TName>>,
) => {
  try {
    const db = getFirebaseFirestore();
    await updateDoc(doc(db, collectionName, documentId), withMetadata(payload, false));
  } catch (error) {
    handleFirebaseError(`updateDocument:${collectionName}`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: FirebaseCollectionName, documentId: string) => {
  try {
    const db = getFirebaseFirestore();
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    handleFirebaseError(`deleteDocument:${collectionName}`, error);
    throw error;
  }
};

export const getDocument = async <TName extends FirebaseCollectionName>(
  collectionName: TName,
  documentId: string,
): Promise<FirestoreCollectionMap[TName] | null> => {
  try {
    const db = getFirebaseFirestore();
    const snapshot = await getDoc(doc(db, collectionName, documentId));

    if (!snapshot.exists()) {
      return null;
    }

    return mapSnapshotData<TName>(snapshot);
  } catch (error) {
    handleFirebaseError(`getDocument:${collectionName}`, error);
    throw error;
  }
};

export const getCollection = async <TName extends FirebaseCollectionName>(
  collectionName: TName,
  constraints: QueryConstraint[] = [],
  options: CollectionQueryOptions = {},
): Promise<Array<FirestoreCollectionMap[TName]>> => {
  try {
    const db = getFirebaseFirestore();
    const appliedConstraints = [...constraints];

    if (options.limitCount) {
      appliedConstraints.push(limit(options.limitCount));
    }

    const baseQuery =
      appliedConstraints.length > 0
        ? query(collection(db, collectionName), ...appliedConstraints)
        : query(collection(db, collectionName), orderBy("updatedAt", "desc"));

    const snapshot = await getDocs(baseQuery);

    return snapshot.docs.map((item) => mapSnapshotData<TName>(item));
  } catch (error) {
    handleFirebaseError(`getCollection:${collectionName}`, error);
    throw error;
  }
};

export const checkFirestoreConnection = async () => {
  try {
    const db = getFirebaseFirestore();
    await getDocs(query(collection(db, FIREBASE_COLLECTIONS.products), limit(1)));

    return {
      connected: true,
      message: "Firebase Firestore is connected and responding normally.",
    };
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === "permission-denied") {
      return {
        connected: true,
        message: "Firebase is connected. Firestore read access is blocked by security rules until login.",
      };
    }

    handleFirebaseError("checkFirestoreConnection", error);
    throw error;
  }
};

export { FIREBASE_COLLECTIONS };
