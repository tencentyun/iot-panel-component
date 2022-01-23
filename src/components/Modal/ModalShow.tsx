import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { FooterConfirmBtnGroup, Modal, ModalProps } from './Modal';
import { getOverlayRoot } from '../../utils/getOverlayRoot';
import { noop } from '../../utils';

export interface ModalShowOptions
  extends Omit<ModalProps, 'visible' | 'onUnmount'> {
}

export interface ModalShowHandle {
  /**
   * 关闭并销毁当前对话框
   */
  close: () => void;
}

/**
 * API 方式唤起一个对话框内容（限h5使用）
 */
export function show({
  popupContainer,
  ...options
}: ModalShowOptions): ModalShowHandle {
  const el = document.createElement('div');

  const instanceRef = React.createRef<ModalShowInstance>();

  ReactDOM.render(
    <ModalShow
      // 保留Modal的默认用法，但是当用api方式唤起时，强制塞 popupContainer以使用 renderPortal 来渲染
      popupContainer={getOverlayRoot(popupContainer)}
      {...options}
      ref={instanceRef}
      onUnmount={() => unmountComponentAtNode(el)}
    />,
    el
  );

  return {
    close: () => {
      if (instanceRef.current) {
        instanceRef.current.setVisible(false);
      }
    },
  };
}

export interface ShowModalApiOptions extends FooterConfirmBtnGroup, ModalShowOptions {
  title?: string | React.ReactElement;
  content?: string | React.ReactElement;
}

export function showModal({
  // 内容
  title,
  content,

  // btn options
  onCancel = noop,
  onConfirm = noop,
  confirmText,
  confirmColor,
  confirmBtnType,
  confirmBtnDisabled,
  cancelText,
  cancelBtnDisabled,
  cancelColor,
  cancelBtnType,

  // modalShowOptions
  maskClosable = false,
  onClose = noop,
  ...modalShowOptions
}: ShowModalApiOptions) {
  if (!title && typeof content === 'string') {
    title = content;
    content = '';
  }

  return new Promise<boolean>(resolve => {
    const doConfirm = () => {
      onConfirm();
      resolve(true);
      close();

      // 如果有传，则 confirm/cancel 都应调用
      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const doCancel = () => {
      onCancel();
      resolve(false);
      close();

      if (typeof onClose === 'function') {
        onClose();
      }
    };

    const { close } = show({
      title,
      maskClosable,
      // 该方法只有一个场景会被调用就是当 maskClosable 时用户点击遮罩，这种当做拒绝
      onClose: doCancel,
      children: (
        <>
          {Boolean(content) && (
            <Modal.Body>
              {
                typeof content === 'string'
                  ? <Modal.Message message={content}/>
                  : content
              }
            </Modal.Body>
          )}
          <Modal.Footer>
            <Modal.FooterConfirmBtnGroup
              {...{
                confirmText,
                confirmColor,
                confirmBtnType,
                confirmBtnDisabled,
                cancelText,
                cancelBtnDisabled,
                cancelColor,
                cancelBtnType,
              }}
              onConfirm={doConfirm}
              onCancel={doCancel}
            />
          </Modal.Footer>
        </>
      ),
      ...modalShowOptions,
    });
  });
}

export function confirm(title?: ShowModalApiOptions['title'], content?: ShowModalApiOptions['content'], {
  confirmText = '确定',
  confirmBtnType = 'primary',
  cancelText = '取消',
  cancelBtnType = 'cancel',
  ...showModalApiOptions
}: Omit<ShowModalApiOptions, 'content' | 'title'> = {}) {
  return showModal({
    title,
    content,
    confirmText,
    confirmBtnType,
    cancelText,
    cancelBtnType,
    ...showModalApiOptions
  });
}

export function alert(content: ShowModalApiOptions['content'], {
  title,
  confirmText = '确定',
  confirmBtnType = 'primary',
  cancelText = '',
  ...showModalApiOptions
}: Omit<ShowModalApiOptions, 'content'> = {}) {
  return confirm(title, content, {
    confirmText,
    confirmBtnType,
    cancelText,
    ...showModalApiOptions,
  });
}

export interface ModalShowProps extends Omit<ModalProps, 'visible'> {
}

export interface ModalShowInstance {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalShow = forwardRef(function ModalShow(
  { onClose, ...props }: ModalShowProps,
  ref: React.Ref<ModalShowInstance>
) {
  const [visible, setVisible] = useState(false);

  // 渲染之后，马上显示
  useEffect(() => {
    setVisible(true);
  }, []);

  // 实例 ref 到外部
  useImperativeHandle(ref, () => ({ setVisible }));

  return (
    <Modal
      onClose={() => {
        setVisible(false);
        if (typeof onClose === 'function') {
          onClose();
        }
      }}
      {...props}
      visible={visible}
    />
  );
});
