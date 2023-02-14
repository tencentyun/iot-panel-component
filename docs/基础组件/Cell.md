## Cell

```jsx
import React, {useState} from 'react';
import { Cell } from 'qcloud-iot-panel-component';


export default () => {
  const [visible,  setVisible] = useState(false);
  return (
    <div 
      style={{padding: 32}}
    >
      <Cell
        title="数字密码1"
        subTitle="2022.10.21"
      />
      <Cell
        title="数字密码2"
        subTitle="2022.10.21"
        showArrow
      />
      <Cell.Group
        title="数字密码列表"
        style={{marginTop: 30}}
      >
        <Cell
          title="数字密码2"
          subTitle="2022.10.21"
          showArrow
        />
        <Cell
          title="数字密码2"
          subTitle="2022.10.21"
        />
      </Cell.Group>
    </div>
  )
}
```

<API src="../../src/components/Card/Card.tsx"></API>
