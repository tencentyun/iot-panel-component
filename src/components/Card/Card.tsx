import React from 'react';
import classNames from 'classnames';
import { StyledProps } from '../../interface';
import './Card.less';
import { Icon } from '../Icon';
import { Hoverable } from '../Hoverable';

export interface CardProps extends StyledProps {
  // 若传入子节点，则直接渲染子节点
  // 否则渲染 title、desc 和 icon
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  desc?: string | JSX.Element;
  icon?: string;
  direction?: 'row' | 'column';
  onClick?: () => void,
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
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

  const renderContent = () => {
    if (Boolean(children)) return children;

    return (
      <>
        {Boolean(icon) && (
          <div className="iotp-card__icon">
            <Icon
              size={24}
              icon={icon}
            />
          </div>
        )}
        <div className="iotp-card__title">
          {title}
          {Boolean(subtitle) && (
            <div className="iotp-card__subtitle">{subtitle}</div>
          )}
        </div>
        <div className="iotp-card__desc">
          {desc}
          {clickable && <span className="iotp-card__ft"/>}
        </div>
      </>
    );
  };

  return (
    <Hoverable
      className={classNames(
        className,
        'iotp-card',
        directionClass,
        {
          'card_disabled': disabled,
        }
      )}
      style={style}
      onClick={onClick}
      disabled={disabled || !clickable}
    >
      {renderContent()}
    </Hoverable>
  );
}
