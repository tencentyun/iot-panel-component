import React, { useEffect, useMemo, useState } from 'react';
import { noop } from '../utils';
import './index.less';
import classNames from 'classnames';

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
  onChange?: (id: any, e: any) => void;
}

export function NumberSlider({
  templateInfo,
  value: outerValue,
  onChange = noop,
  disabled: outerDisabled,
  min = 0,
  max = 0,
  step = 0,
}: NumberSliderProps) {
  let {
    id,
    icon = 'https://iot-public-1256872341.cos.ap-guangzhou.myqcloud.com/bardqi/1631601618691.png',
    name,
    mode = '',
    define: { start = 0, unit = '' } = {},
  } = templateInfo || {};
  min = +min;
  max = +max;
  start = +start;
  step = +step;
  const [value, setValue] = useState(typeof outerValue === 'undefined' ? start : outerValue);
  const disabled = outerDisabled || mode.indexOf('w') === -1;
  useEffect(() => {
    onChange(id, value);
  }, [value]);
  const valueLeft = useMemo(() => ((value - min) * 100) / (max - min), [value]);

  return (
    <div
      className={classNames('iotp-slid-content', {
        disabled: outerDisabled, // 产品希望只读状态下也是有颜色的，适合特定情景下效果呈现
      })}
    >
      <div className="slid-inner">
        <div className="slid-header">
          <img
            src={icon}
            style={{
              width: '20px',
              height: '20px',
              opacity: disabled ? 0.3 : 1,
            }}
          />
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
            onChange={(e) => {
              setValue(e.detail.value);
              onChange(id, e.detail.value);
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
