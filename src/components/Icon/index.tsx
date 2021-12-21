import React, { useMemo } from 'react';
import classNames from 'classnames';
import isUrl from 'is-url';
import { IonIcon } from '../IonIcon';
import { DefaultIcon } from '../DefaultIcon';
import { ThemeColorMap, ThemeColorType, StyledProps } from '../../interface';

import './Icon.less';

export type IconType = 'ionicon' | 'tea' | 'raw';

export interface IconProps extends StyledProps {
  type?: IconType;
  icon?: string;
  color?: string;
  size?: number;
  colorTheme?: ThemeColorType;
  style?: React.CSSProperties

  [propKey: string]: any;
}

// TODO: 可以细化typing
export function Icon({
  type,
  icon,
  color = '',
  colorTheme,
  size = 24,
  style,
  className,
  ...iconProps
}: IconProps) {
  const fontColor = useMemo(() => {
    let result = color;

    if (!result && colorTheme &&  ThemeColorMap[colorTheme]) {
      result = ThemeColorMap[colorTheme];
    }

    // if (!result) result = '#fff';

    return result;
  }, [colorTheme, color]);

  const iconType = useMemo<IconType>(() => {
    if (!type) {
      return isUrl(icon) ? 'raw' : 'ionicon';
    }

    return type;
  }, [type, icon]);

  const render = () => {
    if (!icon) {
      return <DefaultIcon />;
    }
    switch (iconType) {
      case 'raw':
        return (
          <img
            className={classNames('explorer-icon', className)}
            src={icon}
            style={{
              width: size,
              height: size,
              ...style,
            }}
          />
        );
      case 'ionicon':
        return (
          <IonIcon
            color={fontColor}
            icon={icon}
            size={size}
            style={style}
            className={className}
            {...iconProps}
          />
        );
      default:
        return <DefaultIcon />;
    }
  };

  return render();
}
