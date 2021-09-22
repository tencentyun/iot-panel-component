## BoolWidget

用来操作物模型的布尔值

### Demo

```jsx
import React from 'react';
import { BoolWidget } from '@tencent/iot-panel-component';
export default () => (<div>
  <BoolWidget title="这个是开关" />
  <BoolWidget title="小开关" size="small" />
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <BoolWidget title="小开关" size="small" />
    <BoolWidget title="比较长的小开关" size="small" />
  </div>
</div>)
```
<API/>
