import { httpsCallable } from "firebase/functions";

import { getFirebaseFunctionsInstance } from "@/firebase/config";
import { handleFirebaseError } from "@/firebase/errors";

export const callFunction = async <TRequest = unknown, TResponse = unknown>(
  name: string,
  payload?: TRequest,
) => {
  try {
    const callable = httpsCallable<TRequest, TResponse>(getFirebaseFunctionsInstance(), name);
    const result = await callable(payload as TRequest);
    return result.data;
  } catch (error) {
    handleFirebaseError(`callFunction:${name}`, error);
  }
};
