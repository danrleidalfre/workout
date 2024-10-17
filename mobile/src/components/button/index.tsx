import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { LoaderCircle } from '../icons/loader';

const buttonVariants = cva(
  'flex flex-row items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        primary: 'bg-primary',
        secondary: 'bg-secondary-foreground dark:bg-secondary',
        destructive: 'bg-destructive',
      },
      size: {
        sm: 'h-8 px-2',
        md: 'h-10 px-4',
        lg: 'h-12 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const labelVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      primary: 'text-primary-foreground',
      secondary: 'text-secondary dark:text-secondary-foreground',
      destructive: 'text-destructive-foreground',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const iconVariants = cva('', {
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

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
  VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
  icon?: LucideIcon;
  iconAfterLabel?: boolean
  isLoading?: boolean
}

function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  icon: Icon,
  iconAfterLabel,
  isLoading = false,
  ...props
}: ButtonProps) {
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };
  const iconSize = iconSizes[size || 'md'];

  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ variant, size, className }),
        { 'opacity-50': isLoading },
      )}
      disabled={isLoading}
      {...props}
    >
      <View className={cn(
        'flex-row items-center gap-1',
        { 'flex-row-reverse': iconAfterLabel }
      )}>
        {Icon && !isLoading && (
          <Icon
            size={iconSize}
            className={cn(iconVariants({ variant, className: labelClasses }))}
          />
        )}
        {isLoading && (
          <View className='animate-spin'>
            <LoaderCircle
              size={iconSize}
              className={cn(iconVariants({ variant, className: labelClasses }))}
            />
          </View>
        )}
        <Text
          className={cn(
            labelVariants({ variant, size, className: labelClasses })
          )}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, iconVariants, labelVariants };
