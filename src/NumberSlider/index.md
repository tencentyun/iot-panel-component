## NumberSlider

### Demo

```tsx
import React, {useState} from 'react';
import { NumberSlider } from 'qcloud-iot-panel-component';

export default () => <NumberSlider
  value={10}
  step={2}
  min={0}
  onChange={(...args) => console.log(...args)}
  max={200}
  templateInfo={{name: '温度', define: {unit: '度'}}} />
```

<API />
