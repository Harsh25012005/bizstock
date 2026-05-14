import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { getFirebaseStorageInstance } from "@/firebase/config";
import { handleFirebaseError } from "@/firebase/errors";

export const uploadFile = async (path: string, file: Blob | Uint8Array | ArrayBuffer) => {
  try {
    const storageRef = ref(getFirebaseStorageInstance(), path);
    const snapshot = await uploadBytes(storageRef, file);

    return {
      path: snapshot.metadata.fullPath,
      url: await getDownloadURL(snapshot.ref),
    };
  } catch (error) {
    handleFirebaseError(`uploadFile:${path}`, error);
  }
};

export const getStorageFileUrl = async (path: string) => {
  try {
    return await getDownloadURL(ref(getFirebaseStorageInstance(), path));
  } catch (error) {
    handleFirebaseError(`getStorageFileUrl:${path}`, error);
  }
};

export const deleteStorageFile = async (path: string) => {
  try {
    await deleteObject(ref(getFirebaseStorageInstance(), path));
  } catch (error) {
    handleFirebaseError(`deleteStorageFile:${path}`, error);
  }
};
