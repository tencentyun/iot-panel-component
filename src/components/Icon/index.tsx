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
  const { icon, actived, ...others } = props;
  if (!icon) {
    return <DefaultIcon {...others } actived={actived}/>;
  }

  if (typeof icon === 'string' && isUrl(icon)) {
    return <img
      src={icon}
      style={{
        width: props.size || 24,
        height: props.size || 24,
      }}
    />;
  }

  return <IonIcon icon={icon} color={actived ? 'white' : 'black'} {...others} />;
}
