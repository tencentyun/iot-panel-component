## Button

```jsx
/**
 * backgroundColor: #2e2e2e
 */
import React, {useState} from 'react';
import { Btn } from 'qcloud-iot-panel-component';


export default () => (
  <div style={{width: 200}}>
    <h2>基础组件 Button</h2>
    <Btn type="primary">按钮</Btn>
    <Btn type="danger">危险按钮</Btn>
    <Btn type="cancel">cancel按钮</Btn>
    <Btn type="link">link按钮</Btn>
    <p>默认按钮</p>
    <Btn type="default">按钮</Btn>
  </div>
)
```

<API src="../../src/components/Btn/Btn.tsx" hideTitle></API>
