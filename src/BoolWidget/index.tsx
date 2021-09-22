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
  title?: string;
  iconUrl?: string;
  onChange?: (value: boolean) => void
}

export function BoolWidget(props: BoolWidgetProps) {
  const {
    switchColor = '#006EFF',
    title,
    size = 'normal',
    iconUrl,
    onChange,
  } = props;

  return (
    <div className={classNames('iotp-bool-widget', { small: size === 'small' })}>
      {size === 'normal' && <>{iconUrl ? <img src={iconUrl} /> : <DefaultIcon />}</>}
      <div className="title">{title}</div>
      <Switch color={switchColor} onChange={onChange}/>
    </div>
  );
}
