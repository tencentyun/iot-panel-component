import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { Modal, ModalProps } from "./Modal";

export interface ModalShowOptions
  extends Omit<ModalProps, "visible" | "onExited"> {}

export interface ModalShowHandle {
  /**
   * 关闭并销毁当前对话框
   */
  close: () => void;
}

/**
 * API 方式唤起一个对话框内容
 */
export function show(options: ModalShowOptions): ModalShowHandle {
  const el = document.createElement("div");

  const instanceRef = React.createRef<ModalShowInstance>();

  ReactDOM.render(
    <ModalShow
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

export interface ModalShowProps extends Omit<ModalProps, "visible"> {}

export interface ModalShowInstance {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalShow = forwardRef(function ModalShow(
  props: ModalShowProps,
  ref: React.Ref<ModalShowInstance>
) {
  const [visible, setVisible] = useState(false);

  // 渲染之后，马上显示
  useEffect(() => {
    setVisible(true);
  }, []);

  // 实例 ref 到外部
  useImperativeHandle(ref, () => ({ setVisible }));

  return <Modal {...props} visible={visible} />;
});
