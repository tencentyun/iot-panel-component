import React, { useMemo } from 'react';
import classNames from 'classnames';
import thunk from 'lodash.chunk';
import { noop } from '../../src/utils';
import { Icon } from '../components/Icon';
import './index.less';
export interface EnumItem<T> {
  value: T;
  icon?: string;
  text: string;
}
export interface EnumBtnProps<T> {
  /**
   * @description 对应枚举整型/枚举字符型
   */
  value: T;
  /**
   * @description 所有枚举项
   */
  enumList: EnumItem<T>[];
  title?: string;
  icon?: string;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export function EnumBtn<T>(props: EnumBtnProps<T>) {
  const { value, enumList = [], title = '', onChange = noop, icon, disabled } = props;

  const chunkOpts = useMemo(() => {
    const firstLine = enumList.length % 4;
    const rest = thunk(enumList.slice(firstLine), 4);
    return [enumList.slice(0, firstLine), ...rest];
  }, [enumList]);

  return (
    <div className="iotp-enum-btn">
      {title && (
        <div className="iotp-enum-btn-title">
          <Icon icon={icon} />
          <span>{title}</span>
        </div>
      )}
      <div className="iotp-enum-btn-group">
        {
          chunkOpts.map((row: EnumItem<T>[], index) => <div className="enum-row" key={index}>
            {row.map(({ value: itemValue, text, icon }) => (
              <div
                className={classNames('enum-item', { actived: value === itemValue })}
                onClick={() => {
                  if (!disabled && itemValue !== value) {
                    onChange(itemValue);
                  }
                }}
                key={text}
              >
                <button className="enum-btn">
                  {<Icon icon={icon} actived={value === itemValue}/>}
                </button>
                <span className="enum-title">{text}</span>
              </div>
            ))
          }
          </div>)
        }
      </div>
    </div>
  );
}
