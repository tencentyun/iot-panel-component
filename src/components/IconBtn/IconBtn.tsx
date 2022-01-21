import React from 'react';
import classNames from 'classnames';
import { StyledProps } from '../../interface';
import { Hoverable } from '../Hoverable';
import './IconBtn.less';
import { Icon } from '../Icon';
import { DefaultIcon } from '../DefaultIcon';
import { noop } from '../../utils';

export interface IconBtnProps extends StyledProps {
  onClick?: () => any;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  activedIconColor?: string;
  iconBgColor?: string;
  activedIconBgColor?: string;
  btnText?: string;
  btnTextColor?: string;
  actived?: boolean;
  disabled?: boolean;
}

export function IconBtn({
  onClick = noop,
  icon,
  iconSize = 24,
  iconColor,
  activedIconColor = iconColor,
  iconBgColor,
  activedIconBgColor = iconBgColor,
  btnTextColor = '#fff',
  style,
  className,
  btnText,
  actived,
  disabled,
}: IconBtnProps) {
  return (
    <div
      className={classNames('iotp-icon-btn', className, {
        actived,
        disabled,
      })}
      style={style}
    >
      <Hoverable
        className="icon-btn"
        style={{
          backgroundColor: actived ? activedIconBgColor : iconBgColor,
        }}
        onClick={() => {
          if (!disabled && !actived && onClick) {
            onClick();
          }
        }}
      >
        {
          icon
            ? (
              <Icon
                className='btn-icon'
                icon={icon}
                color={actived ? activedIconColor : iconColor}
                size={iconSize}
              />
            )
            : <DefaultIcon actived={actived} className='btn-icon'/>
        }
      </Hoverable>
      {Boolean(btnText) && (
        <span className="btn-text" style={{ color: btnTextColor }}>{btnText}</span>
      )}
    </div>
  )
}
