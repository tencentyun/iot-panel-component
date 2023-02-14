import React, {ReactNode} from 'react';
import { StyledProps } from '../../interface';
import classNames from 'classnames';
import './CellGroup.less';

export interface GroupContextParams {
  isInGroup: boolean;
}

export const GroupContext = React.createContext<GroupContextParams>({
  isInGroup: false,
});

interface CellGroupProps extends StyledProps {
  /**
   * CellGroup的title
   */
  title?: ReactNode;
  /**
   * Cell列表
   */
  children?: ReactNode;
}

export function CellGroup({
  title,
  children,
  className,
  style,
}: CellGroupProps) {
  return (<div className={className} style={style}>
    {title && <div className="iotp-cell-group-title">{title}</div>}
    <GroupContext.Provider value={{ isInGroup: true }}>
      <div className={classNames('iotp-cell-group')}>
        {children}
      </div>
    </GroupContext.Provider>

  </div>);
}
