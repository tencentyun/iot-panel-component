import React from 'react';
import classNames from 'classnames';

import './Card.less';
import { Icon } from '../Icon';
import { Hoverable } from '../Hoverable';

export interface CardProps extends StyledProps {
  // 若传入子节点，则直接渲染子节点
  // 否则渲染 title、desc 和 icon
  title?: string;
  desc?: string;
  icon?: string;
  direction?: 'row' | 'column';
  onClick?: () => void,
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Card({
  title,
  desc,
  icon,
  direction = 'row',
  onClick,
  disabled,
  className,
  style,
  children,
}: CardProps) {
  const clickable = !!onClick;

  let directionClass = '';
  switch (children ? '' : direction) {
    case 'row':
      directionClass = 'iotp-card_row';
      break;
    case 'column':
      directionClass = 'iotp-card_column';
      break;
  }

  icon = (
    <Icon
      size={24}
      icon={icon}
      color={disabled ? '#A1A7B2' : '#15161A'}
    />
  );

  if (!children) {
    children = (
      <>
        { Boolean(icon) && <div className="iotp-card__icon">{icon}</div> }
        <div className="iotp-card__title">{title}</div>
        <div className="iotp-card__desc">{desc}</div>
      </>
    );
  }

  return (
    <div className={className}>
      <Hoverable
        className={classNames(
          'iotp-card',
          'need-hover',
          directionClass,
          {
            'card_disabled': disabled,
          }
        )}
        hoverClass="hover"
        style={style}
        onClick={disabled ? undefined : onClick}
        disabled={disabled || !clickable}
      >
        {children}
      </Hoverable>
    </div>
  );
}
