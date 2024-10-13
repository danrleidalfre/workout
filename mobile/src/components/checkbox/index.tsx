import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string;
  labelClasses?: string;
  checkboxClasses?: string;
}
function Checkbox({
  label,
  labelClasses,
  checkboxClasses,
  className,
  ...props
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(prev => !prev);
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
              'bg-primary border-primary': isChecked,
            },
            checkboxClasses
          )}
        >
          {isChecked && <Text className="text-background text-xl">✓</Text>}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn('text-primary', labelClasses)}>{label}</Text>
      )}
    </View>
  );
}

export { Checkbox };
