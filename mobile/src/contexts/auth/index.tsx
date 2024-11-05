import { token } from "@/storages/token";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ProvidersProps) => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  return (
    <ClerkProvider tokenCache={token} publishableKey={publishableKey}>
      <ClerkLoaded>
        {children}
      </ClerkLoaded>
    </ClerkProvider>
  )
}