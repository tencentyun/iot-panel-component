import React, { useState } from 'react';
import classNames from 'classnames';
import { EnumBtnProps } from '../EnumBtn';
import { noop } from '../utils';
import { Modal } from '../components/Modal';
import { Hoverable } from '../components/Hoverable';
import { Card } from '../components/Card';
import './index.less';

export interface EnumPopupProps<T> extends EnumBtnProps<T> {
  onClose?: () => void;
  templateConfig: TemplatePropertyConfig;
}

export function EnumPopup<T>({
  templateConfig,
  enumList,
  icon,
  value,
  onChange = noop,
  onClose = noop,
  disabled = false,
}: EnumPopupProps<T>) {
  const {
    name,
  } = templateConfig || {};

  const [localValue, setLocalValue] = useState(value);
  const [visible, setVisible] = useState(false);

  return <>
    <Card
      icon={icon}
      title={name}
      desc={(value as any).toString()}
      onClick={() => setVisible(!visible)}
      disabled={disabled}
      className="iot-enum-popup"
    />
    {Boolean(visible) && (
    <Modal
      className="iotp-enum-modal"
      visible={visible}
      fixedBottom={true}
      onClose={onClose}
      title={name}
      showBackBtn={false}
    >
      <Modal.Body>
        <div className="checkbox-group type-radio">
          {enumList.map((item) => (
            <Hoverable
              key={item.text}
              className={classNames('checkbox-item need-hover', {
                actived: item.value === localValue,
              })}
              hoverClass='hover'
              onClick={() => setLocalValue(item.value)}
            >
              <div className="checkbox-container">
                <div className={classNames('checkbox-icon', { checked: item.value === localValue  })} />
              </div>
              <div className="checkbox-item-text text-overflow">
                {item.text}
              </div>
            </Hoverable>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.FooterConfirmBtnGroup
          confirmText="确定"
          cancelText="取消"
          cancelBtnType="cancel"
          isInFixedBottomModal={true}
          onConfirm={() => {
            onChange(localValue);
            onClose();
          }}
          onCancel={() => {
            setVisible(false);
            onClose();
          }}
        />
      </Modal.Footer>
    </Modal>
    )}
  </>;
}
