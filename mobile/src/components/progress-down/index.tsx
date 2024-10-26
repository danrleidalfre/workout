import { useEffect, useRef } from 'react';
import { Animated, View as RnView, type View } from 'react-native';

import { cn } from '@/lib/utils';

function ProgressDown({
  className,
  ...props
}: { className?: string; value: number } & React.ComponentPropsWithoutRef<
  typeof View
>) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: props.value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, props.value]);

  return (
    <RnView
      className={cn(
        'h-0.5 w-full overflow-hidden bg-neutral-800 dark:bg-neutral-200',
        className
      )}
    >
      <Animated.View
        className={
          cn(
            'h-full',
            { 'bg-destructive': props.value < 25 },
            { 'bg-primary': props.value >= 25 }
          )
        }
        style={{
          width: widthAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </RnView>
  );
}

export { ProgressDown };
