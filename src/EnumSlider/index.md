## EnumSlider

用于操作枚举型数据，但是是一个slider形式

### demo

```tsx
import React, {useState} from 'react';
import { EnumSlider } from 'qcloud-iot-panel-component';
const [enumVal, setEnumVal] = useState(0);
const enumList = [
  {text: '温馨', value: 0},
  {text: '读书', value: 1},
  {text: '明亮', value: 2},
  {text: '动感', value: 3},
  {text: '安静', value: 4},
  {text: '睡眠', value: 5},
];

export default () => (
  <EnumSlider
    value={enumVal}
    enumList={enumList}
    onChange={(v) => {console.log(v); setEnumVal(v)} }
  />
)
```

<API />
