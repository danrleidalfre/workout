import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';
import { Check } from '../icons/check';
import { X } from '../icons/x';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string;
  labelClasses?: string;
  checkboxClasses?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({
  label,
  labelClasses,
  checkboxClasses,
  className,
  checked,
  onChange,
  disabled = false,
  ...props
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(checked || false);

  const toggleCheckbox = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      setChecked(newChecked);
      onChange?.(newChecked);
    }
  };

  return (
    <View
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    >
      <TouchableOpacity onPress={toggleCheckbox} disabled={disabled}>
        <View
          className={cn(
            'size-10 rounded-md flex justify-center items-center',
            {
              'bg-neutral-900 dark:bg-neutral-100': !isChecked,
              'bg-primary': isChecked,
            },
            checkboxClasses
          )}
        >
          {disabled ? (
            <X className={cn(
              'text-muted dark:text-muted-foreground opacity-80',
            )} size={16} />
          ) : (
            <Check className={cn(
              'text-muted',
              { 'dark:text-muted-foreground opacity-80': !isChecked },
            )} size={16} />
          )}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn('text-primary', labelClasses, { 'opacity-50': disabled })}>{label}</Text>
      )}
    </View>
  );
}

export { Checkbox };
