## EnumSlider

用于操作枚举型数据，但是是一个slider形式

### demo

```tsx
import React, {useState} from 'react';
import { EnumSlider } from 'qcloud-iot-panel-component';
const [enumVal, setEnumVal] = useState('a');
const enumList = [
  {text: '温馨', value: 'a'},
  {text: '读书', value: 'b'},
  {text: '明亮', value: 'c'},
  {text: '动感', value: 'd'},
  {text: '安静', value: 'e'},
  {text: '睡眠', value: 'f'},
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
