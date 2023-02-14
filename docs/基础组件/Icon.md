## Icon

```jsx
import React, {useState} from 'react';
import { Icon } from 'qcloud-iot-panel-component';


export default () => (
  <div style={{width: 200}}>
    <h2>基础组件Icon</h2>
    <Icon/>
    <Icon icon="add"/>
    <Icon icon="add-circle"/>
    <Icon icon="add-circle" color="blue"/>
  </div>
)
```

<API src="../../src/components/Icon/index.tsx" hideTitle></API>
