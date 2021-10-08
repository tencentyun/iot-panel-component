## DisplayPanel

用于展示当前设备的状态值

### Demo

```jsx

import React, {useState} from 'react';
import { DisplayPanel, EnumBtn } from 'qcloud-iot-panel-component';
const [enumVal, setEnumVal] = useState(0);
const enumList = [
  {text: 'x', value: 0, icon: 'create'},
  {text: 'y', value: 1},
  {text: 'z', value: 2},
  {text: 'foo', value: 3},
  {text: 'bar', value: 4},
  {text: 'baz', value: 5},
];

export default () => (
  <div>
    <DisplayPanel
      value={enumVal}
      name={'显示面板'}
    />
    <EnumBtn
      value={enumVal}
      enumList={enumList}
      onChange={(v) => {console.log(v); setEnumVal(v)} }
    />
  </div>
)
```
