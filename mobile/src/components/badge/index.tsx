import { type VariantProps, cva } from 'class-variance-authority';
import { Text, View } from 'react-native';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex flex-row items-center rounded-md px-2 py-1',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary-foreground dark:bg-secondary',
        destructive: 'bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

const badgeTextVariants = cva('font-medium text-center text-sm', {
  variants: {
    variant: {
      primary: 'text-primary-foreground',
      secondary: 'text-secondary dark:text-secondary-foreground',
      destructive: 'text-destructive-foreground',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
  VariantProps<typeof badgeVariants> {
  label: string;
  labelClasses?: string;
}
function Badge({
  label,
  labelClasses,
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(badgeTextVariants({ variant }), labelClasses)}>
        {label}
      </Text>
    </View>
  );
}

export { Badge, badgeVariants };
