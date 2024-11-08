import { BicepsFlexed } from "@/components/icons/biceps";
import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
}

export function AuthLayout({ children }: Props) {
  return (
    <View className="flex-1 items-center bg-background dark:bg-foreground pt-40 gap-2">
      <BicepsFlexed size={80} className="text-primary mx-auto" strokeWidth={1} />
      {children}
    </View>
  )

}