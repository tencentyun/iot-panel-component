import React, { forwardRef, useState, Ref, useEffect } from 'react';
import classNames from 'classnames';
import { StyledProps } from '../../interface';
import './Hoverable.less';
import { callAll } from '../../utils/callAll';

export interface HoverableProps<P extends keyof JSX.IntrinsicElements>
  extends StyledProps {

  // 使用什么标签来渲染，默认为 div；组件可透传对应标签的原生属性
  parent?: P;

  // 子组件
  children?: React.ReactNode;

  // 禁用 hover 效果
  disabled?: boolean;

  // hover 时向标签增加的 className，默认为 hover
  hoverClass?: string;

  // 小程序View独有
  // 按住后多久出现点击态，单位毫秒
  hoverStartTime?: number;
  // 手指松开后点击态保留时间，单位毫秒
  hoverStayTime?: number;
}

export type HoverablePropsType<P extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[P] & HoverableProps<P>;

const isTaro = process.env.TARO_ENV === 'weapp';

export const Hoverable = forwardRef(function Hoverable<P extends keyof JSX.IntrinsicElements = 'div'>(
  {
    parent = 'div' as P,
    children,
    className,
    disabled,
    hoverClass = 'hover',
    hoverStartTime = 20,
    hoverStayTime = 70,
    // 避免传进来的onTouchStart等被覆盖
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onClick,
    ...htmlProps
  }: HoverablePropsType<P>,
  ref: Ref<JSX.IntrinsicElements[P]>,
) {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (disabled) {
      setHover(false);
    }
  }, [disabled]);

  const genTouchHandler = enable => () => {
    if (!isTaro && !disabled) {
      setHover(enable);
    }
  };

  const props: any = {
    ref,
    className: classNames('iotp-hoverable', className, {
      [hoverClass]: !disabled && hover,
    }),
    onTouchStart: callAll(genTouchHandler(true), onTouchStart as any),
    onTouchMove: callAll(genTouchHandler(false), onTouchMove as any),
    onTouchEnd: callAll(genTouchHandler(false), onTouchEnd as any),
    onClick: (e) => {
      if (!disabled && typeof onClick === 'function') {
        onClick(e);
      }
    },
    ...htmlProps,
  };

  if (isTaro) {
    props.hoverClass = hoverClass;
    props.hoverStartTime = hoverStartTime;
    props.hoverStayTime = hoverStayTime;
  }

  return React.createElement(
    parent,
    props,
    children,
  );
});
