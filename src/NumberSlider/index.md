## NumberSlider

NumberSlider 可以用来操作物模型中的 number(int, float) 类型的值

### Demo

```tsx
import React from 'react';
import { NumberSlider } from 'qcloud-iot-panel-component';

export default () => {
  return (
    <div>
      <NumberSlider
        step={2}
        value={10}
        min={0}
        onChange={(...args) => console.log(...args)}
        max={200}
        templateInfo={{name: '温度', define: {unit: '度'}}}
      />
      <NumberSlider
        value={50}
        step={0.33}
        min={30}
        onChange={(...args) => console.log(...args)}
        max={100}
        templateInfo={{name: '温度', define: {unit: '度'}}}
      />
    </div>
  )
}
```

<API />
