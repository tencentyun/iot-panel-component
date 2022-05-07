/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { noop } from '../../utils';
import { ConfirmBtnGroup, ConfirmBtnGroupProps } from '../Btn';
import './Modal.less';
import { StyledProps } from '../../interface';
import { show, confirm, alert, showModal } from './ModalShow';
import { PopupContainer, renderPortal } from '../../utils/renderPortal';

export interface ModalProps extends StyledProps {
  /**
   * @description 弹窗是否显示
   */
  visible: boolean;
  /**
   * @description 弹窗的标题
   */
  title?: string | React.ReactNode;
  /**
   * @description 触发关闭操作时的回调函数
   */
  onClose?: () => any;
  maskClosable?: boolean;
  /**
   * @description 弹窗展示时是否吸底
   */
  fixedBottom?: boolean;
  children?: React.ReactNode;
  containerClassName?: string;
  /**
   * @description 组件挂载节点，仅支持 web 端
   */
  popupContainer?: PopupContainer;
  onUnmount?: () => any;
}

export function Modal({
  visible,
  title,
  onClose = noop,
  maskClosable = true,
  fixedBottom = false,
  children,
  className,
  containerClassName,
  style,
  popupContainer,
  onUnmount,
}: ModalProps) {
  useEffect(() => () => typeof onUnmount === 'function' && onUnmount(), []);

  return renderPortal((
    <div
      className={classNames(
        'modal-container',
        containerClassName,
        {
          'modal-active': visible,
          'modal-fixed-bottom': fixedBottom,
        },
      )}
      onTouchMove={e => e.stopPropagation()}
    >
      <div
        className='modal-mask'
        onClick={() => {
          if (maskClosable) {
            onClose && onClose();
          }
        }}
      />
      <div
        className={classNames('modal', className)}
        style={style}
      >
        {title && (
          <div className='modal-header'>
            <div className='modal-title'>{title}</div>
          </div>
        )}
        {children}
      </div>
    </div>
  ), popupContainer);
}

Modal.Body = ({ children }) => (
  <div className='modal-body'>
    {children}
  </div>
);

Modal.Footer = ({
  children,
  showDivider,
}: {
  showDivider?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className={classNames('modal-footer')}>
      {showDivider && (
        <Modal.Divider/>
      )}
      {children}
    </div>
  );
};

export interface FooterConfirmBtnGroup extends ConfirmBtnGroupProps {
  isInFixedBottomModal?: boolean;
  noBorder?: boolean;
  btnSize?: number;
}

Modal.Divider = () => (
  <div className='modal-divider'/>
);

Modal.FooterConfirmBtnGroup = ({
  onCancel,
  onConfirm,
  confirmText,
  confirmColor,
  confirmBtnType = 'primary',
  confirmBtnDisabled,
  cancelText,
  cancelBtnDisabled,
  cancelColor,
  cancelBtnType = 'cancel',
  isInFixedBottomModal,
  noBorder,
  // 移除btnSize，因为h5无法用rpx单位，可能会导致两端表现不一致，这里固定样式即可
  // btnSize = 32,
}: FooterConfirmBtnGroup) => {
  const renderContent = () => {
    if (isInFixedBottomModal) {
      return (
        <ConfirmBtnGroup
          {...{
            onCancel,
            onConfirm,
            confirmText,
            confirmColor,
            confirmBtnType,
            confirmBtnDisabled,
            cancelText,
            cancelColor,
            cancelBtnType,
            cancelBtnDisabled,
          }}
        />
      );
    }

    return (
      <div className='footer-confirm-btn-group'>
        {!!cancelText && (
          <Modal.FooterBtn
            className={classNames(`btn-type-${cancelBtnType}`)}
            noBorder={noBorder}
            onClick={onCancel}
            style={{
              color: cancelColor,
            }}
          >
            {cancelText}
          </Modal.FooterBtn>
        )}
        {!!confirmText && (
          <Modal.FooterBtn
            className={classNames(`btn-type-${confirmBtnType}`)}
            noBorder={noBorder}
            onClick={onConfirm}
            style={{
              color: confirmColor,
            }}
          >
            {confirmText}
          </Modal.FooterBtn>
        )}
      </div>
    );
  };

  return renderContent();
};

export interface FooterBtnProps extends StyledProps {
  children: React.ReactNode;
  onClick?: any;
  noBorder?: boolean;
}

// eslint-disable-next-line react/display-name
Modal.FooterBtn = ({
  children,
  onClick,
  style,
  className,
  noBorder,
}: FooterBtnProps) => (
  <div
    className={classNames('modal-footer-btn need-hover', className, {
      'no-border': noBorder,
    })}
    onClick={onClick}
    style={style}
  >
    {children}
  </div>
);

Modal.Message = ({ message }) => (
  <div className='modal-message'>
    {message}
  </div>
);

Modal.show = show;
Modal.showModal = showModal;
Modal.confirm = confirm;
Modal.alert = alert;
