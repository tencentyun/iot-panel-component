import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { noop, getFloatDigit } from '../utils';
import './index.less';
import classNames from 'classnames';
import { Icon } from '../components/Icon';
import { TemplatePropertyConfig } from '../interface';

const { Slider }
  = process.env.TARO_ENV === 'weapp'
  ? require('@tarojs/components')
  : require('../components/Slider');

export interface NumberSliderProps {
  /**
   * @description 可以提供unit, name等信息
   */
  templateInfo?: TemplatePropertyConfig;
  /**
   * @description 要操作的值
   */
  value: number
  /**
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @description 增加或减少的步长
   */
  step: number
  /**
   * @description number的最小值
   */
  min: number
  /**
   * @description number的最大值
   */
  max: number
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
  const decimalLength = getFloatDigit(step);

  useEffect(() => {
    if (outerValue !== undefined && outerValue <= max && outerValue >= min) {
      setValue(outerValue);
    }
  }, [outerValue]);

  const valueLeft = useMemo(() => ((value - min) * 100) / (max - min), [value]);
  const tagOffset = useRef(0);
  const tagRef = useCallback((nodeRef) => {
    if (process.env.TARO_ENV === 'weapp') {
      // 解决获取clientRect可能为null的问题 https://github.com/NervJS/taro/issues/10242
      setTimeout(() => {
        (nodeRef as any).getBoundingClientRect().then(res => {
          if (res !== null) {
            tagOffset.current = res.width / 2;
          }
        });
      }, 0);
    } else {
      // web获取tag的宽度
      if (nodeRef !== null) {
        tagOffset.current = nodeRef.offsetWidth / 2;
      }
    }
  }, []);

  return (
    <div
      className={classNames('iotp-number-slide', {
        disabled: disabled,
      })}
    >
      <div className="slid-inner">
        <div className="iotp-slid-title">
          <Icon icon={icon}/>
          <div className="slid-name text-overflow">{name}</div>
        </div>
        <div className="slid-body">
          <div
            className="number-control-value"
            ref={tagRef}
            style={{
              left: `calc(${valueLeft}% - ${tagOffset.current}px)`,
            }}
          >
            {name}:{value.toFixed(decimalLength)}
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
            // style={{
            //   marginLeft: 0,
            //   marginRight: 0,
            // }}
          />
        </div>
      </div>
    </div>
  );
}
