import React, { useState, useEffect } from 'react';
import './index.less';
import classNames from 'classnames';
import { NumberSliderProps } from '../NumberSlider';
import { noop, arithmeticType, arithmetic } from '../utils';

export function NumberInput({
  templateInfo,
  value: outerValue,
  onChange = noop,
  min = 0,
  max = 0,
  step = 0,
  disabled: outerDisabled = false,
  style,
  className,
}: NumberSliderProps) {
  let {
    name,
    define: {
      start = 0, unit = '',
    } = {},
  } = templateInfo || {};
  min = +min;
  max = +max;
  start = +start;
  step = +step;
  const [value, setValue] = useState(outerValue === undefined ? start : outerValue);
  // const disabled = outerDisabled;
  const calculation = (isAdd, number1, number2) => {
    if (outerDisabled) return;
    let value = arithmetic(isAdd ? arithmeticType.add : arithmeticType.sub, number1, number2);
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (outerValue !== undefined) {
      setValue(outerValue);
    }
  }, [outerValue]);

  return (
    <div
      className={classNames(
        'iotp-number-input',
        className,
        { disabled: outerDisabled }, // 产品希望只读状态下也是有颜色的，适合特定情景下效果呈现
      )}
      style={style}
    >
      <div className="panel-inner">
        <div style={{ textAlign: 'center', color: '#a1a7b2' }}>
          <span>{name}</span>
        </div>
        <div className="panel-body">
          <div>
            <button
              className="iotp-panel-btn"
              disabled={value <= min}
              onClick={() => {
                calculation(false, value, step);
              }}
            >-
            </button>
          </div>
          <span className="panel-text">{value}{unit}</span>
          <div>
            <button
              className="iotp-panel-btn"
              disabled={value >= max}
              onClick={() => {
                calculation(true, value, step);
              }}
            >+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
