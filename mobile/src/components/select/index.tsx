import React, { useRef, useState } from 'react';
import {
  FlatList,
  LayoutRectangle,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { cn } from '@/lib/utils';

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
}: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] =
    useState<LayoutRectangle | null>(null);
  const selectButtonRef = useRef<TouchableOpacity>(null);

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
    <View className={cn('flex flex-col gap-1.5')}>
      {label && (
        <Text className={cn('text-base text-muted dark:text-muted-foreground', labelClasses)}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        ref={selectButtonRef}
        className={cn(
          selectClasses,
          'px-4 h-10 flex-row items-center rounded-md text-muted dark:text-muted-foreground bg-secondary-foreground dark:bg-secondary'
        )}
        onPress={openDropdown}
      >
        <Text className="text-base text-muted dark:text-muted-foreground">
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
              className="absolute h-60 px-4 mt-1 rounded-md text-muted dark:text-muted-foreground bg-secondary-foreground dark:bg-secondary border border-foreground dark:border-background"
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
                    <Text className="text-muted dark:text-muted-foreground">{item.label}</Text>
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