import { Button } from "@/components/button";
import { BicepsFlexed } from "@/components/icons/biceps";
import { LogIn } from "@/components/icons/login";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";
import { View } from "react-native";

WebBrowser.maybeCompleteAuthSession()

export function AuthLayout() {
  const googleOAuth = useOAuth({ strategy: 'oauth_google' })

  const [isLoading, setIsLoading] = useState(false)

  async function signInGoogle() {
    try {
      setIsLoading(true)

      const flowOAuth = await googleOAuth.startOAuthFlow()

      if (flowOAuth.authSessionResult?.type === 'success' && flowOAuth.setActive) {
        await flowOAuth.setActive({ session: flowOAuth.createdSessionId })
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync()

    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])

  return (
    <View className="flex-1 justify-center items-center gap-4 bg-background dark:bg-foreground">
      <BicepsFlexed size={60} className="text-primary" strokeWidth={1} />
      <Button label={isLoading ? '' : 'Entrar com Google'} icon={LogIn} iconAfterLabel size="lg" onPress={signInGoogle} isLoading={isLoading} />
    </View>
  )
}