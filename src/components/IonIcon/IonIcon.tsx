import React from 'react';
import classNames from 'classnames';
import { StyledProps, ThemeColorMap, ThemeColorType } from '../../interface';
import './IonIcon.less';

interface IconProps extends StyledProps {
  icon: string;
  color?: string;
  size?: number;
  theme?: 'ios' | 'logo' | 'md';
  colorTheme?: ThemeColorType;
  style?: React.CSSProperties
}

export function IonIcon({
  icon,
  color = '#000',
  colorTheme,
  size = 24,
  theme = 'md',
  style,
  className,
}: IconProps) {
  if (!color && colorTheme && ThemeColorMap[colorTheme]) {
    color = ThemeColorMap[colorTheme];
  }

  const iconSize = `${size}px`;

  return (
    <i
      className={classNames('ion-icon', `ion-${theme}-${icon}`, className)}
      style={{
        color,
        fontSize: iconSize,
        width: iconSize,
        height: iconSize,
        lineHeight: iconSize,
        ...style,
      }}
    />
  );
}
