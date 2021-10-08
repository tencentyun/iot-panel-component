import React from 'react';
import classNames from 'classnames';
import './index.less';

interface DisplayPanelProps extends StyledProps {
  value: string;
  name: string;
}

export function DisplayPanel(props: DisplayPanelProps) {
  const {
    name,
    value,
    className,
    style,
  } = props;
  return (
    <div className={classNames('iotp-display-panel', className)} style={style} >
      <div className="display-name">{name}</div>
      <div className="display-value">{value}</div>
    </div>
  );
}
