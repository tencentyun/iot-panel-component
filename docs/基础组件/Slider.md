## Slider

```jsx
import React, {useState} from 'react';
import { Slider } from 'qcloud-iot-panel-component';


export default () => (
  <div style={{width: 200}}>
    <h2>基础组件 Slider</h2>
    <Slider step={2} min={0} max={100} />
    <Slider step={2} min={0} max={200} onChange={console.log}/>
  </div>
)
```

<API src="../../src/components/Slider/SliderH5.tsx" hideTitle></API>
