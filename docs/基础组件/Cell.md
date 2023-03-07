## Cell

```jsx
import React, {useState} from 'react';
import { Cell, Icon } from 'qcloud-iot-panel-component';


export default () => {
  return (
    <div 
      style={{padding: 16}}
    >
      <Cell
        title="数字密码1"
        subTitle="2022.10.21"
      />
      <Cell 
        style={{marginTop: 10}}
        icon="trash"
        title="数字密码2"
        footer="去查看"
        showArrow
      />
      <Cell
        style={{marginTop: 10}}
        icon="trash"
        title="数字密码2"
        footer={<Icon icon="bicycle"/>}
        showArrow
      />
      <Cell.Group
        title="数字密码列表"
        style={{marginTop: 30}}
      >
        <Cell
          title="数字密码1"
          subTitle="2022.10.21"
          showArrow
        />
        <Cell
          title="数字密码2"
          subTitle="2022.10.21"
          showArrow
        />
        <Cell
          title="数字密码3"
          subTitle="2022.10.21"
          showArrow
        />
      </Cell.Group>
    </div>
  )
}
```

<API src="../../src/components/Cell/Cell.tsx"></API>
