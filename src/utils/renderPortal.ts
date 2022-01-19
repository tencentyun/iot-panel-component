import ReactDOM from 'react-dom';

export type PopupContainer = HTMLElement | (() => HTMLElement);

export const renderPortal = (reactNode, popupContainer?: PopupContainer) => {
  if (process.env.TARO_ENV === 'weapp') {
    return reactNode;
  }

  if (typeof popupContainer === 'function') {
    popupContainer = popupContainer();
  }

  return popupContainer
    ? ReactDOM.createPortal(reactNode, popupContainer)
    : reactNode;
};
