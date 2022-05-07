import React from 'react';
import classNames from 'classnames';
import { StyledProps } from '../interface';
import './index.less';

interface DisplayPanelProps extends StyledProps {
  value: string;
  name: string;
}

export function DisplayPanel({
  name,
  value,
  className,
  style,
}: DisplayPanelProps) {
  return (
    <div className={classNames('iotp-display-panel', className)} style={style}>
      <div className="display-name">{name}</div>
      <div className="display-value">{value}</div>
    </div>
  );
}
