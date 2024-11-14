import { cn } from '@/libs/utils';
import { LucideIcon } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  LayoutRectangle,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface ISelectedOption {
  label: string;
  value: string;
}

export interface ISelectedOptionsArray {
  options?: ISelectedOption[];
}

export type ISelectedValue = string | number | undefined;

const convertToOptions = <T extends Record<string, any>>(
  data?: T[],
  labelKey?: keyof T,
  valueKey?: keyof T
): ISelectedOption[] => {
  if (!data || !labelKey || !valueKey) return [];
  return data.map(item => ({
    label: String(item[labelKey]),
    value: item[valueKey],
  }));
};

export interface SelectProps {
  label?: string;
  labelClasses?: string;
  selectClasses?: string;
  options: any[];
  onSelect: (value: string | number) => void;
  selectedValue?: string | number;
  placeholder: string;
  labelKey: string;
  valueKey: string;
  icon?: LucideIcon;
  iconClasses?: string;
}

export const Select = ({
  label,
  labelClasses,
  selectClasses,
  options,
  onSelect,
  selectedValue,
  placeholder,
  labelKey,
  valueKey,
  icon: Icon,
  iconClasses,
}: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] =
    useState<LayoutRectangle | null>(null);
  const selectButtonRef = useRef<View>(null);

  const new_options = convertToOptions(options, labelKey, valueKey);

  const handleSelect = (value: string | number) => {
    onSelect(value);
    setIsDropdownOpen(false);
  };

  const openDropdown = () => {
    selectButtonRef.current?.measure((_fx, _fy, _w, _h, px, py) => {
      setDropdownPosition({
        x: px,
        y: py + _h,
        width: _w,
        height: _h,
      });
      setIsDropdownOpen(true);
    });
  };

  return (
    <View className={cn('gap-1.5')}>
      {label && (
        <Text className={cn('text-base text-primary', labelClasses)}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        ref={selectButtonRef}
        className={cn(
          selectClasses,
          'gap-1 flex-row px-4 min-h-10 justify-center items-center rounded-md text-muted-foreground dark:text-muted bg-secondary dark:bg-secondary-foreground'
        )}
        onPress={openDropdown}
      >
        {Icon && (
          <Icon
            size={16}
            className={cn(labelClasses, iconClasses)}
          />
        )}
        <Text className={cn('text-base text-primary', labelClasses)}>
          {selectedValue
            ? new_options.find(option => option.value === selectedValue)?.label
            : placeholder}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && dropdownPosition && (
        <Modal visible={isDropdownOpen} transparent animationType="none">
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsDropdownOpen(false)}
          >
            <View
              style={{
                top: dropdownPosition.y,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
              }}
              className="absolute h-60 px-4 mt-1 rounded-md text-muted-foreground dark:text-muted bg-secondary dark:bg-secondary-foreground border border-background dark:border-foreground"
            >
              <FlatList
                data={new_options}
                keyExtractor={item => item.value.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    className="py-3"
                  >
                    <Text className="text-muted-foreground dark:text-muted">{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};
