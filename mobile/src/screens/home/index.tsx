import { Button } from "@/components/ui/button";
import { Play } from "@/components/ui/icons/play";
import { PlusCircle } from "@/components/ui/icons/plus";
import { Search } from "@/components/ui/icons/search";
import { Trash2 } from "@/components/ui/icons/trash";
import { Text, View } from "react-native";

export function Home() {
  return (
    <View className="flex-1 bg-foreground dark:bg-background px-10 gap-4 pt-4">
      <View className="flex-row justify-between">
        <Button label="Treino" icon={PlusCircle} />
        <Button label="Pesquisar" variant="secondary" icon={Search} />
        <Button label="Remover" variant="destructive" icon={Trash2} />
      </View>
      <View className="border border-border rounded-md p-4 flex-row justify-between items-center">
        <View>
          <Text className="text-muted dark:text-muted-foreground text-lg font-medium">Push</Text>
          <Text className="text-muted dark:text-muted-foreground text-base font-light">Remada, Puxada, Rosca Direta</Text>
        </View>
        <Play size={28} strokeWidth={1} className="text-primary" />
      </View>
    </View>
  )
}