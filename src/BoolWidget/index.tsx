import React from 'react';
import classNames from 'classnames';
import './style.less';
import { DefaultIcon } from '../components/DefaultIcon';
const { Switch } = process.env.TARO_ENV === 'weapp' ? require('@tarojs/components') : require('../components/switch');

interface BoolWidgetProps {
  /**
   * @description 控制switch的颜色
   */
  switchColor?: string;
  /**
   * @default 'normal'
   */
  size?: 'small' | 'normal',
  value: boolean;
  title?: string;
  iconUrl?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void
}

export function BoolWidget(props: BoolWidgetProps) {
  const {
    switchColor = '#006EFF',
    title,
    value,
    size = 'normal',
    iconUrl,
    onChange,
    disabled = false,
  } = props;

  return (
    <div className={classNames('iotp-bool-widget', { small: size === 'small' })}>
      {size === 'normal' && <>{iconUrl ? <img src={iconUrl} /> : <DefaultIcon />}</>}
      <div className="title">{title}</div>
      <Switch color={switchColor} onChange={onChange} value={value} disabled={disabled} />
    </div>
  );
}
