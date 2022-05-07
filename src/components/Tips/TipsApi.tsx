import React from 'react';
import './Tips.less';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { noop } from '../../utils';
import { TipsProps, TipsHandler, TipsMain } from './TipsMain';
import { getErrorMsg } from '../../utils/getErrorMsg';

export interface ShowTipsReturn {
  hide: () => any;
}

export interface TipsApi {
  show?: (message: string, options?: Omit<TipsProps, 'message'>) => ShowTipsReturn;
  showError?: (error: any, options?: { defaultMsg?: string } & Omit<TipsProps, 'message'>) => ShowTipsReturn;
  showInfo?: (message: string, options?: Omit<TipsProps, 'message'>) => ShowTipsReturn;
  showSuccess?: (message: string, options?: Omit<TipsProps, 'message'>) => ShowTipsReturn;
  showLoading?: (message?: string, options?: Omit<TipsProps, 'message'>) => ShowTipsReturn;
}

let tipsOccupied = false;

const show: TipsApi['show'] = (message, {
  onClose = noop,
  replaceable,
  ...options
} = {}) => {
  if (tipsOccupied && !replaceable) return { hide: noop };

  const el = document.createElement('div');

  const instanceRef = React.createRef<TipsHandler>();
  ReactDOM.render(
    <TipsMain
      {...options}
      message={message}
      ref={instanceRef}
      onClose={() => {
        tipsOccupied = false;
        onClose();
        unmountComponentAtNode(el);
      }}
    />,
    el
  );

  tipsOccupied = true;

  const hide = () => {
    if (instanceRef.current) {
      instanceRef.current.setVisible(false);
    }
  };

  return {
    hide,
  };
};

const showInfo: TipsApi['showInfo'] = (message, options) => {
  return show(message, { type: 'info', ...options });
};

const showSuccess: TipsApi['showSuccess'] = ((message, options) => {
  return show(message, { type: 'success', mask: true, ...options });
});

const showError: TipsApi['showError'] = ((error, { defaultMsg, ...options } = {}) => {
  const errMsg = getErrorMsg(error, { defaultMsg, ...options });

  if (errMsg) {
    return show(errMsg, { type: 'danger', mask: true, duration: 3000, ...options });
  }

  return { hide: noop };
});

const showLoading: TipsApi['showLoading'] = ((message = '加载中…', options) => {
  if (!message.endsWith('…')) {
    message += '…';
  }

  return show(message, {
    type: 'loading',
    mask: true,
    replaceable: true,
    duration: 0,
    delay: 200,
    clickClosable: false,
    ...options
  });
});

export const tipsApi: TipsApi = {
  show,
  showInfo,
  showSuccess,
  showError,
  showLoading,
};
