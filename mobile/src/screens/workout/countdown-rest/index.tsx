import { Clock } from "@/components/icons/clock";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type RestCountdownProps = {
  restTime: number;
  start: boolean;
  onComplete: () => void;
};

export function CountdownRest({ restTime, start, onComplete }: RestCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(restTime);

  useEffect(() => {
    if (!start || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <View>
      {timeLeft > 0 && (
        <View className="items-center flex flex-row gap-1">
          <Clock size={16} className="text-muted dark:text-muted-foreground" />
          <Text className="font-semibold text-xl text-muted dark:text-muted-foreground">{formatTime(timeLeft)}</Text>
        </View>
      )}
    </View>
  );
}
