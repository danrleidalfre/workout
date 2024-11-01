import { cn } from '@/libs/utils';
import { Animated, type View } from 'react-native';

function Skeleton({
  className,
  ...props
}: { className?: string } & React.ComponentPropsWithoutRef<typeof View>) {

  return (
    <Animated.View
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}

export { Skeleton };
