## Modal

```jsx
import React, {useState} from 'react';
import { Modal, Btn, NumberSlider } from 'qcloud-iot-panel-component';


export default () => {
  const [visible,  setVisible] = useState(false);
  return (
    <div>
      <h2>基础组件 Modal</h2>
      <Modal
        title="弹窗"
        visible={visible}
        onClose={() => setVisible(false)}
        fixedBottom
      >
        <div style={{padding: '20px 0'}}>这里是弹窗内容</div>
        <NumberSlider
          step={2}
          value={10}
          min={0}
          onChange={(...args) => console.log(...args)}
          max={200}
          templateInfo={{name: '温度', define: {unit: '度'}}}
        />
        <Modal.FooterConfirmBtnGroup
          isInFixedBottomModal
          confirmText="确定"
          cancelText="取消"
        />
      </Modal>
      <Btn onClick={() => setVisible(!visible)} type="primary">显示弹窗</Btn>
    </div>
  )
}
```
<API src="../../src/components/Modal/Modal.tsx"></API>




