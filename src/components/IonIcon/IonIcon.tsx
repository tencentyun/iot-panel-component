import React from 'react';
import classNames from 'classnames';
import { StyledProps } from '../../interface';
import './IonIcon.less';

export interface IonIconProps extends StyledProps {
  icon: string;
  color?: string;
  size?: number;
  theme?: 'md' | 'ios' | 'logo';
}

export function IonIcon({
  icon,
  color = '#000',
  size = 24,
  theme = 'md',
  style = {},
  className,
}: IonIconProps) {

  const iconSize = `${size}px`;

  return (
    <div
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
