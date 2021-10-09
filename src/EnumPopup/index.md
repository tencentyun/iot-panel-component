## EnumPopup

### Demo

```jsx
import React, {useState} from 'react';
import { EnumPopup } from 'qcloud-iot-panel-component';
const [enumVal, setEnumVal] = useState(0);
const enumList = [
  {text: '第一项', value: 0},
  {text: '第二项', value: 1},
  {text: '第三项', value: 2},
  {text: 'foo', value: 3},
  {text: 'bar', value: 4},
  {text: 'baz', value: 5},
];

export default () => (
  <EnumPopup
    value={enumVal}
    icon="create"
    templateConfig={{name: '枚举弹窗'}}
    enumList={enumList}
    onChange={(v) => {console.log(v); setEnumVal(v)} }
  />
)
```

<API />
