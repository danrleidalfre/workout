import { useEffect, useRef } from 'react';
import { Animated, View as RnView, type View } from 'react-native';

import { cn } from '@/lib/utils';

function Progress({
  className,
  ...props
}: { className?: string; value: number } & React.ComponentPropsWithoutRef<
  typeof View
>) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: props.value,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [widthAnim, props.value]);

  return (
    <RnView
      className={cn(
        'h-1 w-full overflow-hidden bg-foreground dark:bg-background',
        className
      )}
    >
      <Animated.View
        className={cn('bg-secondary dark:bg-primary h-full')}
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

export { Progress };
