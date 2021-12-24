## BoolWidget

用来操作物模型的布尔值

### Demo

```jsx
import React from 'react';
import { BoolWidget } from 'qcloud-iot-panel-component';
export default () => (<div>
  <BoolWidget title="这个是开关" />
  <BoolWidget title="这个是开关" description="包含副标题"/>
  <BoolWidget title="这个是名字非常非常非常非常长的开关" />
  <BoolWidget title="小开关" size="small" />
  <BoolWidget title="还是小开关" size="small" onChange={(val) => console.log('状态:', val)}/>
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <BoolWidget title="小开关" size="small" />
    <BoolWidget title="比较长的小开关" size="small" />
  </div>
</div>)
```
<API/>
