import React, { useEffect, useMemo, useState } from 'react';
import { noop } from '../utils';
import './index.less';
import classNames from 'classnames';
import { Icon } from '../components/Icon';
const { Slider }
  = process.env.TARO_ENV === 'weapp'
    ? require('@tarojs/components')
    : require('../components/slider');

export interface NumberSliderProps{
  templateInfo?: TemplatePropertyConfig;
  /**
   * @description 要操作的值
   */
  value: number
  disabled?: boolean // 是否禁用
  step: number // 增加的步长
  min: number // number的最小值
  max: number // number的最大值
  icon?: string
  onChange?: (value: number) => void;
}

export function NumberSlider({
  templateInfo,
  value: outerValue,
  onChange = noop,
  icon,
  disabled,
  min = 0,
  max = 0,
  step = 0,
}: NumberSliderProps) {
  let {
    name,
    define: { start = 0, unit = '' } = {},
  } = templateInfo || {};
  min = +min;
  max = +max;
  start = +start;
  step = +step;
  const [value, setValue] = useState(outerValue === undefined ? start : outerValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (outerValue !== undefined) {
      setValue(outerValue);
    }
  }, [outerValue]);

  const valueLeft = useMemo(() => ((value - min) * 100) / (max - min), [value]);

  return (
    <div
      className={classNames('iotp-number-slide', {
        disabled: disabled,
      })}
    >
      <div className="slid-inner">
        <div className="iotp-slid-title">
          <Icon icon={icon} />
          <div className="slid-name text-overflow">{name}</div>
        </div>
        <div className="slid-body">
          <div
            className="number-control-value"
            style={{
              left: `${valueLeft}%`,
            }}
          >
            {name}:{value}
            {unit}
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            backgroundColor="#E1E4E9"
            activeColor="#006eff"
            blockSize={28}
            blockColor="#fff"
            value={value}
            onChanging={(e) => {
              setValue(e.detail.value);
            }}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.detail.value);
              onChange(e.detail.value);
            }}
            style={{
              marginLeft: 0,
              marginRight: 0,
            }}
          ></Slider>
        </div>
      </div>
    </div>
  );
}
