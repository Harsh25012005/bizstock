import { useEffect, useState } from "react";

export const useOtpTimer = (initialSeconds = 30) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setSecondsRemaining((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondsRemaining]);

  return {
    secondsRemaining,
    canResend: secondsRemaining === 0,
    reset: () => setSecondsRemaining(initialSeconds),
  };
};
