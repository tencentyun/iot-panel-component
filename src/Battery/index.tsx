import React from 'react';
import classNames from 'classnames';
import './index.less';
import { StyledProps } from '../interface';

interface BatteryProps extends StyledProps {
  /**
   * @description 电量百分比
   */
  value?: number;
  /**
   * @description 电池颜色
   */
  color?: string;
  /**
   * @description 是否显示百分比
   */
  showLabel?: boolean;
}

export function Battery({
  value = 0,
  color = '#292B2F',
  className,
  showLabel = false,
  style
}: BatteryProps) {
  const percent = value > 100 ? 100 : value;
  return (
    <div className={classNames('iotp-battery-wrapper', className)} style={style}>
      <div className="iotp-battery">
        <div className="iotp-battery-percent"
          style={{
            width: value <= 1 ? `${percent * 100}%` : `${percent}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
      {showLabel && <span className='battery-label'>{value}%</span>}
    </div>
  );
}
