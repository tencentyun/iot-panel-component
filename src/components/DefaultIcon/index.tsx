import classNames from 'classnames';
import React from 'react';
import settingImg from '../images/setting.svg';
import settingActivedImg from '../images/setting_actived.svg';
import './index.less';

declare interface StyledProps {
  /**
   * 组件自定义类名
   */
  className?: string;

  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

export interface DefaultIconProps extends StyledProps {
  actived?: boolean;
  size?: number;
}

export function DefaultIcon(props: DefaultIconProps) {
  const {
    actived,
    size = 24,
    className = '',
    style = {},
  } = props;

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
