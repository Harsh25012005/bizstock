const shouldLog = __DEV__;

export const logger = {
  info: (...args: unknown[]) => {
    if (shouldLog) {
      console.log("[BizStock]", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (shouldLog) {
      console.warn("[BizStock]", ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (shouldLog) {
      console.error("[BizStock]", ...args);
    }
  },
};
