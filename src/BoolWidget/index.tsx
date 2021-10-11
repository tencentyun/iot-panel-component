import React from 'react';
import classNames from 'classnames';
import './index.less';
import { Icon } from '../components/Icon';
import { noop } from '../utils';
const { Switch } = process.env.TARO_ENV === 'weapp' ? require('@tarojs/components') : require('../components/switch');

interface BoolWidgetProps {
  /**
   * @description 控制switch的颜色
   */
  switchColor?: string;
  /**
   * @default 'normal'
   * @description 控制组件的长度
   */
  size?: 'small' | 'normal',
  value: boolean;
  title?: string;
  /**
   * @description icon使用ionicons 4.x, 所有的icon名称在 https://github.com/tencentyun/iot-panel-component/blob/master/src/components/IonIcon/IonIcon.less
   */
  icon?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void
}

export function BoolWidget(props: BoolWidgetProps) {
  const {
    switchColor = '#006EFF',
    title,
    value,
    size = 'normal',
    icon,
    onChange = noop,
    disabled = false,
  } = props;

  return (
    <div className={classNames('iotp-bool-widget', { small: size === 'small' })}>
      <div className="iotp-bool-widget-title">
        {size === 'normal' && <Icon icon={icon}/>}
        <span>{title}</span>
      </div>
      <Switch color={switchColor} onChange={(e) => onChange(e.detail.value)} checked={Boolean(value)} disabled={disabled} />
    </div>
  );
}
