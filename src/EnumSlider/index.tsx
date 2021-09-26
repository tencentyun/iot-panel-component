import React, { useRef, useEffect, useState, useMemo } from 'react';
import { EnumBtnProps, EnumItem } from '../EnumBtn';
import { noop, delay } from '../utils';
import classNames from 'classnames';
import './index.less';

export function EnumSlider<T>({
  enumList: options,
  value,
  onChange = noop,
  disabled,
}: EnumBtnProps<T>) {
  const size = useMemo(() => ({
    textWidth: 100,
    containerWidth: 338,
  }), []);

  const stateRef = useRef({
    dragging: false,
    offsetLeft: 0,
    touchStartOffsetLeft: 0,
    touchStartX: 0,
    originalIndex: 0,
  });

  // 每一个set称为一个集合，一共放5个集合，以保证怎么拖动都不会漏边
  const clonedOptions = useMemo<EnumItem<T>[]>(() => [
    ...options,
    ...options,
    ...options,
    ...options,
    ...options,
  ], [options]);

  const [state, setState] = useState<{offsetLeft: number, offsetTransition: boolean, currentValue: T}>({
    offsetLeft: 0,
    offsetTransition: false,
    currentValue: null as any,
  });

  useEffect(() => {
    if (!stateRef.current.dragging && value !== state.currentValue) {
      setCurrentPosition(value);
    }
  }, [value]);

  /**
   * @param value 将哪个值放到中间
   * @param round 将第几轮的值放到中间（一共5轮）
   * @returns number
   */
  const getOffsetByValue = (value, round = 2) => {
    const baseOffset = options.length * size.textWidth * round - size.containerWidth / 2 + size.textWidth / 2;
    return baseOffset + value * size.textWidth;
  };

  // 将当前激活元素对准在中间，并重置当前列表到正中间
  const setCurrentPosition = (currentValue, offsetTransition = false, round = 2) => {
    stateRef.current.offsetLeft = getOffsetByValue(currentValue, round);

    setState({
      offsetLeft: stateRef.current.offsetLeft,
      currentValue,
      offsetTransition,
    });
  };

  // 在滚动过程中，更新offset和激活元素大小
  const setStyle = (offsetLeft) => {
    // 计算当前激活的值
    const fingerOffset = offsetLeft - state.offsetLeft;
    const index = options.findIndex((opt: EnumItem<T>) => opt.value === value);
    // 真正应该激活第几个
    // eslint-disable-next-line no-mixed-operators
    const originalIndex = Math.round(fingerOffset % size.containerWidth / size.textWidth) + index;
    let currentIndex = originalIndex;
    if (currentIndex >= options.length) currentIndex = originalIndex - options.length;
    if (currentIndex < 0) currentIndex = originalIndex + options.length;
    stateRef.current.originalIndex = originalIndex;
    setState({
      offsetTransition: false,
      currentValue: options[currentIndex].value,
      offsetLeft,
    });
  };

  const animationLoop = () => {
    if (stateRef.current.dragging) {
      setStyle(stateRef.current.offsetLeft);
      requestAnimationFrame(() => animationLoop());
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    stateRef.current.dragging = true;
    stateRef.current.touchStartX = e.touches[0].pageX;
    stateRef.current.touchStartOffsetLeft = stateRef.current.offsetLeft;
    animationLoop();
  };

  const handleTouchMove = (e) => {
    const {
      pageX,
    } = e.touches[0];
    stateRef.current.offsetLeft = stateRef.current.touchStartOffsetLeft - pageX + stateRef.current.touchStartX;
  };

  // 修正偏移距离，使激活选项还在中间
  const handleTouchEnd = async (e) => {
    stateRef.current.dragging = false;
    e.preventDefault();
    // 先完成滚动动画100ms
    const round = Math.floor(stateRef.current.originalIndex / options.length) + 2;
    setCurrentPosition(state.currentValue, true, round);
    await delay(110);
    // 滚动完，重置为第二轮值的中间
    setCurrentPosition(state.currentValue, false);

    !disabled && onChange(state.currentValue);
    return;
  };

  return (
    <div className={classNames('scene-slider', 'iotp-enum-slider')}>
      <div
        className='scene-slider-container'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className='scene-slider'
          style={{
            width: clonedOptions.length * size.textWidth,
            transform: `translate3d(${-state.offsetLeft}px, 0, 0)`,
            transition: state.offsetTransition ? 'transform .1s ease-out' : 'none',
          }}
        >
          {clonedOptions.map((scene, index) => (
            <div
              key={index}
              className={classNames('scene-slider-item', {
                actived: scene.value === state.currentValue,
              })}
              style={{
                width: size.textWidth,
              }}
            >
              <div>
                {scene.text}
              </div>
              <div className="panel-rule"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
