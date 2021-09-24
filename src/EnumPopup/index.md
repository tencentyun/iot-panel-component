## EnumPopup

### Demo

```jsx
import React, {useState} from 'react';
import { EnumPopup } from 'qcloud-iot-panel-component';
const [enumVal, setEnumVal] = useState(0);
const enumList = [
  {text: 'x', value: 0},
  {text: 'y', value: 1},
  {text: 'z', value: 2},
  {text: 'foo', value: 3},
  {text: 'bar', value: 4},
  {text: 'bar', value: 5},
];

export default () => (
  <EnumPopup
    value={enumVal}
    enumList={enumList}
    onChange={(v) => {console.log(v); setEnumVal(v)} }
  />
)
```

<API />
