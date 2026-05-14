import Svg, { Path } from "react-native-svg";

import { Button, type ButtonProps } from "@/components/ui/Button";

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21.8 12.23c0-.68-.06-1.33-.17-1.95H12v3.69h5.5a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.94-1.78 3.04-4.4 3.04-7.38Z"
      fill="#4285F4"
    />
    <Path
      d="M12 22c2.76 0 5.07-.91 6.76-2.39l-3.3-2.56c-.91.61-2.08.97-3.46.97-2.66 0-4.92-1.8-5.73-4.22H2.86v2.64A10 10 0 0 0 12 22Z"
      fill="#34A853"
    />
    <Path
      d="M6.27 13.8A6 6 0 0 1 5.95 12c0-.63.11-1.24.32-1.8V7.56H2.86A10 10 0 0 0 2 12c0 1.62.39 3.15 1.08 4.44l3.19-2.64Z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.98c1.5 0 2.84.52 3.9 1.54l2.92-2.92C17.07 2.98 14.76 2 12 2a10 10 0 0 0-9.14 5.56L6.27 10.2c.81-2.42 3.07-4.22 5.73-4.22Z"
      fill="#EA4335"
    />
  </Svg>
);

export const SocialLoginButton = ({ label = "Continue with Google", ...props }: Omit<ButtonProps, "variant">) => {
  return <Button label={label} variant="secondary" size="lg" leftIcon={<GoogleIcon />} {...props} />;
};
