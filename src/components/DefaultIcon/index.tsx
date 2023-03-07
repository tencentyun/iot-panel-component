import classNames from 'classnames';
import React from 'react';
import settingImg from '../images/setting.svg';
import settingActivedImg from '../images/setting_actived.svg';
import './index.less';
import { StyledProps } from '../../interface';

export interface DefaultIconProps extends StyledProps {
  actived?: boolean;
  size?: number;
  [key: string]: any;
}

export function DefaultIcon({
  actived,
  size = 24,
  className = '',
  style = {},
}: DefaultIconProps = {}) {
  return (
    <div
      style={{
        backgroundImage: `url("${actived ? settingActivedImg : settingImg}")`,
        width: size,
        height: size,
        ...style,
      }}
      className={classNames('panel-default-icon', className)}/>
  );
}
