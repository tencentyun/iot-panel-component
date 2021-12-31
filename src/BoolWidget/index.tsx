import React from 'react';
import classNames from 'classnames';
import './index.less';
import { Icon, Switch } from '../components';
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
  size?: 'small' | 'normal',
  value: boolean;
  title?: string;
  /**
   * @description 副标题
   */
  description?: string,

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
    description = '',
    value,
    size = 'normal',
    icon,
    onChange = noop,
    disabled = false,
    className,
    style,
  } = props;

  return (
    <div
      className={classNames('iotp-bool-widget', className, { small: size === 'small' })}
      style={style}
    >
      <div className="iotp-bool-widget-hd">
        {size === 'normal' && <Icon icon={icon}/>}
        <div className="content">
          <div>{title}</div>
          { description && (
            <div className="iotp-bool-widget-desc">
              {description}
            </div>
            )
          }
        </div>
      </div>
      <Switch color={switchColor} onChange={(e) => onChange(e.detail.value)} checked={Boolean(value)} disabled={disabled} />
    </div>
  );
}
