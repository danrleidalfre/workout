import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';
import { Check } from '../icons/check';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string;
  labelClasses?: string;
  checkboxClasses?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox({
  label,
  labelClasses,
  checkboxClasses,
  className,
  checked,
  onChange,
  ...props
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(checked || false);

  const toggleCheckbox = () => {
    const newChecked = !isChecked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <View
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    >
      <TouchableOpacity onPress={toggleCheckbox}>
        <View
          className={cn(
            'size-10 border border-border rounded-md flex justify-center items-center',
            {
              'border-primary bg-primary': isChecked,
            },
            checkboxClasses
          )}
        >
          {isChecked && (
            <Check className={cn('text-muted', { 'dark:text-muted-foreground': !isChecked })} size={16} />
          )}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn('text-primary', labelClasses)}>{label}</Text>
      )}
    </View>
  );
}

export { Checkbox };
