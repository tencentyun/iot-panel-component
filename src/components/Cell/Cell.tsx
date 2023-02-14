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
  icon?: string
  body?: ReactNode
  footer?: ReactNode
  subTitle?: ReactNode
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
    {icon && (<Icon
        size={24}
        icon={icon}
      />)
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
