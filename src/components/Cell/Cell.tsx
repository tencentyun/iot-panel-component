import React, {ReactNode, useContext} from 'react';
import { StyledProps } from '../../interface';
import { Icon } from '../Icon';
import { CellGroup } from './Group';
import classNames from 'classnames';
import { GroupContext } from './Group';
import { noop } from '../../utils';
import './Cell.less';


interface CellProps extends StyledProps {
  title?: ReactNode
  /**
   * 如果传string，会将icon传入<Icon />组件，否则认为是ReactNode
   */
  icon?: ReactNode
  /**
   * footer展示的内容
   */
  footer?: ReactNode
  /**
   * 副标题
   */
  subTitle?: ReactNode
  /**
   * @description 是否显示尾部箭头
   */
  showArrow?: boolean
  onClick?: () => void;
}

export function Cell({
  title,
  subTitle,
  icon,
  footer,
  className,
  showArrow,
  style,
  onClick = noop
}: CellProps) {
  const { isInGroup } =  useContext(GroupContext);
  return (<div
      className={classNames('iotp-cell', className, {'iotp-cell-inner': isInGroup})}
      style={style}
      onClick={onClick}
    >
    {typeof icon === 'string' ? (<Icon
        size={24}
        icon={icon}
      /> ): icon
    }
    <div className="iotp-cell-hd">
      {title && <div className="iotp-cell-title">
        {title}</div>
      }
      {subTitle && <div className="iotp-cell-subtitle">{subTitle}</div>}

    </div>
    <div className="iotp-cell-ft">
      {footer}
      {showArrow && <div className="iotp-arrow" />}
    </div>
  </div>);
}

Cell.Group = CellGroup;
