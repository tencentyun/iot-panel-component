import React from 'react';
import { IonIcon } from '../IonIcon';
import { DefaultIcon } from '../DefaultIcon';
import { isUrl } from '../../utils';

export interface IconProps {
  icon?: string;
  actived?: boolean;
  color?: string;
  size?: number;
}

export function Icon(props: IconProps) {
  const { icon, ...others } = props;
  if (!icon) {
    return <DefaultIcon {...others }/>;
  }

  if (typeof icon === 'string' && isUrl(icon)) {
    return <img
      src={icon}
      style={{
        width: props.size,
        height: props.size,
      }}
    />;
  }

  return <IonIcon icon={icon} {...others} />;
}
