import React from 'react';
import classNames from 'classnames';
import './index.less';
import { Card, Switch } from '../components';
import { noop } from '../utils';
import { StyledProps } from '../interface';

interface BoolWidgetProps extends StyledProps {
  /**
   * @description 控制switch的颜色
   */
  switchColor?: string;
  /**
   * @default 'normal'
   * @description 控制组件的长度
   */
  // size?: 'small' | 'normal',
  value: boolean;
  title?: string | JSX.Element;
  /**
   * @description 副标题
   */
  description?: string | JSX.Element;

  /**
   * @description icon使用ionicons 4.x, 所有的icon名称在 https://github.com/tencentyun/iot-panel-component/blob/master/src/components/IonIcon/IonIcon.less
   */
  icon?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void
}

export function BoolWidget({
  switchColor = '#006EFF',
  title,
  description = '',
  value,
  // size,
  icon,
  onChange = noop,
  disabled = false,
  className,
  style
}: BoolWidgetProps) {
  return (
    <Card
      className={classNames('iotp-bool-widget', className)}
      style={style}
      icon={icon}
      title={title}
      subtitle={description}
      desc={(
        <Switch
          color={switchColor}
          onChange={(e) => onChange(e.detail.value)}
          checked={Boolean(value)}
          disabled={disabled}
        />
      )}
      disabled={disabled}
    />
  );
}
