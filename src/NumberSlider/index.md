## NumberSlider

### Demo

```tsx
import React from 'react';
import { NumberSlider } from 'qcloud-iot-panel-component';

export default () => <div>
  <NumberSlider
    value={10}
    step={2}
    min={0}
    onChange={(...args) => console.log(...args)}
    max={200}
    templateInfo={{name: '温度', define: {unit: '度'}}}
  />
  <NumberSlider
    value={10}
    step={0.33}
    min={1}
    onChange={(...args) => console.log(...args)}
    max={15}
    templateInfo={{name: '温度', define: {unit: '度'}}}
  />
</div>
```

<API />
