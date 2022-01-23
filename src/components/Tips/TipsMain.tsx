import React, {
  useMemo,
  useEffect,
  useRef,
  forwardRef,
  useLayoutEffect,
  useState,
  useImperativeHandle,
} from 'react';
import classNames from 'classnames';
import { StyledProps } from '../../interface';
import { noop } from '../../utils';
import './Tips.less';
import { PopupContainer, renderPortal } from '../../utils/renderPortal';

const IconMap = {
  info: 'https://main.qcloudimg.com/raw/438065ddc553e9f3878e644b7a229133/icon-info.svg',
  danger: 'https://main.qcloudimg.com/raw/976f05afa6f68662b3c82685092fdd5b/icon-danger-white.svg',
  loading: 'https://main.qcloudimg.com/raw/a48ce7bbec0baf9c7032356be18efe90/icon-loading.svg',
  success: 'https://main.qcloudimg.com/raw/d7b1bcd3cafac63070a5455c29e09b48/icon-success.svg',
};

export interface TipsProps extends StyledProps {
  message: string;
  type?: 'info' | 'danger' | 'loading' | 'success';
  mask?: boolean;
  duration?: number;
  delay?: number; // 延时多久才弹出，避免一闪而过
  clickClosable?: boolean;
  replaceable?: boolean; // 默认已经有弹出时，后面弹出的忽略，如果设置为true，则后面的可以覆盖前面的
  onClose?: () => any;
  popupContainer?: PopupContainer;
}

export interface TipsHandler {
  setVisible: (visible: boolean) => any;
}

export const TipsMain = forwardRef<TipsHandler, TipsProps>(function Tips({
  message,
  type = 'info',
  mask = true,
  duration = 1500,
  delay,
  clickClosable,
  onClose = noop,
  popupContainer,
}, ref) {
  const tipsType = useMemo(() => {
    if (!IconMap[type]) return 'info';

    return type;
  }, [type]);

  // 每个tips都是一次性的，展示完关闭后，标记已展示，后不会再展示
  const alreadyShown = useRef(false);

  const [visible, _setVisible] = useState(false);

  const setVisible = (nextVisible) => {
    if (alreadyShown.current) return;

    if (!nextVisible) {
      alreadyShown.current = true;
    }

    _setVisible(nextVisible);

    if (nextVisible === false) {
      setTimeout(() => {
        onClose();
      }, 200);
    }
  };

  useImperativeHandle(ref, () => ({ setVisible }));

  const timerRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timerRef.current);
  }, []);

  useLayoutEffect(() => {
    clearTimeout(timerRef.current);
    if (visible && duration !== 0) {
      timerRef.current = setTimeout(() => setVisible(false), duration);
    }
  }, [visible, duration]);

  return renderPortal((
    <div className='iotp-tips'>
      {mask && <div className="float-mask"/>}
      <div
        className={classNames('float-tips', `tips-${tipsType}`, {
          show: visible,
        })}
        onClick={() => {
          if (clickClosable) {
            setVisible(false);
          }
        }}
      >
        <img className='tips-icon' src={IconMap[tipsType]}/>
        <div className="tips-message">
          {message}
        </div>
      </div>
    </div>
  ), popupContainer);
});
