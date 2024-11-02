import { cn } from '@/libs/utils';
import { useEffect, useRef } from 'react';
import { Animated, View as RnView, type View } from 'react-native';

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
        'h-2 w-full rounded-full overflow-hidden bg-secondary dark:bg-secondary-foreground border border-primary',
        className
      )}
    >
      <Animated.View
        className={cn(
          'bg-primary h-full',
        )}
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
