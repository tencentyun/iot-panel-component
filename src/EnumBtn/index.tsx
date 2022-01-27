import React from 'react';
import classNames from 'classnames';
import { noop } from '../utils';
import { Icon } from '../components/Icon';
import { StyledProps } from '../interface';
import './index.less';
import { IconBtn } from '../components/IconBtn';

export interface EnumItem<T> {
  value: T;
  icon?: string;
  text: string;
}

export interface EnumBtnProps<T> extends StyledProps {
  /**
   * @description 对应枚举整型/枚举字符型
   */
  value: T;
  /**
   * @description 所有枚举项
   */
  enumList: EnumItem<T>[];
  /**
   * @description 可以提供标题和图标
   */
  title?: string;
  icon?: string;
  onChange?: (value: T) => void;
  disabled?: boolean;
  /**
   * @description 每行放置几项，最大为4
   */
  itemPerRow?: number;
}

export function EnumBtn<T>({
  value,
  enumList = [],
  title = '',
  onChange = noop,
  icon,
  disabled,
  style,
  className,
  itemPerRow = 4,
}: EnumBtnProps<T>) {

  const isInLastRow = (index) => {
    return index / itemPerRow >= Math.ceil(enumList.length / itemPerRow) - 1;
  };

  return (
    <div className={classNames('iotp-enum-btn', className)} style={style}>
      {title && (
        <div className="iotp-enum-btn-title">
          <Icon icon={icon}/>
          <span>{title}</span>
        </div>
      )}
      <div className="iotp-enum-btn-body">
        {enumList.map(({ value: itemValue, text, icon }, index) => (
          <IconBtn
            className='iotp-enum-btn-item'
            key={text}
            actived={value === itemValue}
            icon={icon}
            btnText={text}
            btnTextColor='#000'
            iconColor='#000'
            activedIconColor='#fff'
            iconBgColor='#F2F2F2'
            activedIconBgColor='#0066FF'
            style={{
              width: `${100 / itemPerRow}%`,
              marginBottom: isInLastRow(index) ? 0 : '30px'
            }}
            onClick={() => {
              if (!disabled && itemValue !== value) {
                onChange(itemValue);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
