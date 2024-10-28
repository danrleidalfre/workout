import type { LucideIcon } from 'lucide-react-native';
import { createElement, FC } from 'react';

export function iconWithClassName(icon: LucideIcon, className: string) {
  const IconWithClass: FC<any> = (props) => {
    const { className: incomingClassName, ...restProps } = props;

    return createElement(icon, {
      ...restProps,
      className: `${incomingClassName || ''} ${className}`,
    });
  };

  return IconWithClass;
}
