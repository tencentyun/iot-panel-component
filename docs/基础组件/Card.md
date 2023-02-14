## Card

```jsx
import React, {useState} from 'react';
import { Card } from 'qcloud-iot-panel-component';


export default () => {
  const [visible,  setVisible] = useState(false);
  return (
    <div>
      <h2>基础组件 Card</h2>
      <Card
        title="卡片"
        subtitle="卡片副标题"
        desc="卡片描述"
      />
      <div
        style={{display:'flex'}}
      >
        <Card
          direction="column"
          title="卡片"
          subtitle="卡片副标题"
          desc="卡片描述"
          style={{width: '40%'}}
        />
        <Card
          direction="column"
          title="卡片"
          desc="卡片描述"
          style={{width: '40%'}}
        />
      </div>
      <Card>
        <img src="https://cloudcache.tencentcs.cn/qcloud/tcloud_dtc/static/tc_portal_icon/fda0213b-8f1a-4e65-9996-0e066fa8b5ea.png" />
        <div>支持传入children</div>
      </Card>
    </div>
  )
}
```

<API src="../../src/components/Card/Card.tsx"></API>
